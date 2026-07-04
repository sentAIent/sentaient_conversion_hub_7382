#!/usr/bin/env node

/**
 * SentAIent Orchestrator — MCP Server
 * Exposes marketing functions to Antigravity IDE
 * Port: 3100
 *
 * Tools exposed:
 *   market.generate_campaign     — Full campaign pipeline trigger
 *   market.get_campaign_status   — Poll campaign progress
 *   market.list_staged_assets    — List assets ready for review
 *   market.approve_asset         — Move asset from staging to approved
 *   market.get_brand_config      — Read brand house codes for a brand
 *   market.list_brands           — List all configured brands
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync, renameSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { createClient } from "redis";

// ── Config ────────────────────────────────────────────────
const N8N_URL = process.env.N8N_URL || "http://localhost:5678";
const N8N_API_KEY = process.env.N8N_API_KEY || "";
const BRAND_CODES_PATH = process.env.BRAND_CODES_PATH || "/config/brand-house-codes.json";
const MEDIA_BASE = "/marketing/media";
const STAGING_PATH = join(MEDIA_BASE, "staging");
const APPROVED_PATH = join(MEDIA_BASE, "approved");
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

// ── Redis client ──────────────────────────────────────────
const redis = createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});
redis.connect().catch(console.error);

// ── Helpers ───────────────────────────────────────────────
function loadBrandCodes() {
  const raw = readFileSync(BRAND_CODES_PATH, "utf-8");
  return JSON.parse(raw);
}

async function triggerN8nWorkflow(payload) {
  const res = await fetch(`${N8N_URL}/webhook/campaign-intake`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(N8N_API_KEY ? { "X-N8N-API-KEY": N8N_API_KEY } : {}),
    },
    body: JSON.stringify({ body: payload }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`n8n webhook failed: ${res.status} — ${text}`);
  }
  return res.json();
}

// ── Tool definitions ─────────────────────────────────────
const TOOLS = [
  {
    name: "market__generate_campaign",
    description: "Trigger a full campaign pipeline for a brand. Generates strategy, script, caption, and visual brief. Assets land in /marketing/media/staging/{campaign_id}/",
    inputSchema: {
      type: "object",
      properties: {
        brand: {
          type: "string",
          enum: ["cloveh2o", "mindwave", "sentaient"],
          description: "Target brand to generate campaign for",
        },
        input_type: {
          type: "string",
          enum: ["url", "text", "pdf"],
          description: "Type of source input",
        },
        input_value: {
          type: "string",
          description: "URL, text content, or PDF path to base the campaign on",
        },
        campaign_type: {
          type: "string",
          enum: ["viral_hook", "technical_deep_dive", "founder_story"],
          description: "Campaign format template to use",
          default: "viral_hook",
        },
        requested_formats: {
          type: "array",
          items: { type: "string", enum: ["9:16", "1:1", "16:9", "email"] },
          description: "Output asset formats to generate",
          default: ["9:16", "1:1"],
        },
      },
      required: ["brand", "input_type", "input_value"],
    },
  },
  {
    name: "market__get_campaign_status",
    description: "Get the current status of a campaign by its ID",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description: "Campaign ID returned from generate_campaign",
        },
      },
      required: ["campaign_id"],
    },
  },
  {
    name: "market__list_staged_assets",
    description: "List all campaigns currently in staging awaiting review or approval",
    inputSchema: {
      type: "object",
      properties: {
        brand: {
          type: "string",
          enum: ["cloveh2o", "mindwave", "sentaient", "all"],
          description: "Filter by brand, or 'all' for everything",
          default: "all",
        },
      },
    },
  },
  {
    name: "market__approve_asset",
    description: "Move a staged campaign asset to the approved folder, marking it ready for publishing",
    inputSchema: {
      type: "object",
      properties: {
        campaign_id: {
          type: "string",
          description: "Campaign ID to approve",
        },
      },
      required: ["campaign_id"],
    },
  },
  {
    name: "market__get_brand_config",
    description: "Retrieve the full brand house codes configuration for a specific brand",
    inputSchema: {
      type: "object",
      properties: {
        brand: {
          type: "string",
          enum: ["cloveh2o", "mindwave", "sentaient"],
          description: "Brand to retrieve config for",
        },
      },
      required: ["brand"],
    },
  },
  {
    name: "market__list_brands",
    description: "List all brands configured in the SentAIent Orchestrator",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// ── Tool handlers ─────────────────────────────────────────
async function handleTool(name, args) {
  switch (name) {

    case "market__generate_campaign": {
      const result = await triggerN8nWorkflow({
        brand: args.brand,
        input_type: args.input_type,
        input_value: args.input_value,
        campaign_type: args.campaign_type || "viral_hook",
        requested_formats: args.requested_formats || ["9:16", "1:1"],
      });
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2),
        }],
      };
    }

    case "market__get_campaign_status": {
      const raw = await redis.get(`campaign:${args.campaign_id}`);
      if (!raw) {
        // Check human review queue too
        const reviewRaw = await redis.get(`human_review:${args.campaign_id}`);
        if (reviewRaw) {
          const data = JSON.parse(reviewRaw);
          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                campaign_id: args.campaign_id,
                status: "needs_human_review",
                confidence: data.confidence,
                message: "Confidence below 90% threshold — awaiting manual approval before proceeding",
              }, null, 2),
            }],
          };
        }
        return {
          content: [{ type: "text", text: JSON.stringify({ error: "Campaign not found", campaign_id: args.campaign_id }) }],
        };
      }
      return {
        content: [{ type: "text", text: raw }],
      };
    }

    case "market__list_staged_assets": {
      const brand = args.brand || "all";
      if (!existsSync(STAGING_PATH)) {
        return { content: [{ type: "text", text: JSON.stringify({ staged: [], count: 0 }) }] };
      }
      const dirs = readdirSync(STAGING_PATH, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      const filtered = brand === "all"
        ? dirs
        : dirs.filter(d => d.includes(brand));

      const assets = filtered.map(id => {
        const stagingDir = join(STAGING_PATH, id);
        const files = readdirSync(stagingDir).catch?.() || [];
        return { campaign_id: id, path: stagingDir, files };
      });

      return {
        content: [{
          type: "text",
          text: JSON.stringify({ staged: assets, count: assets.length }, null, 2),
        }],
      };
    }

    case "market__approve_asset": {
      const srcPath = join(STAGING_PATH, args.campaign_id);
      const destPath = join(APPROVED_PATH, args.campaign_id);

      if (!existsSync(srcPath)) {
        return {
          content: [{ type: "text", text: JSON.stringify({ error: `Campaign ${args.campaign_id} not found in staging` }) }],
        };
      }

      mkdirSync(APPROVED_PATH, { recursive: true });
      renameSync(srcPath, destPath);

      await redis.set(
        `campaign:${args.campaign_id}`,
        JSON.stringify({ campaign_id: args.campaign_id, status: "approved", approved_at: new Date().toISOString(), path: destPath })
      );

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: true,
            campaign_id: args.campaign_id,
            status: "approved",
            approved_path: destPath,
            message: "Asset moved to approved. Ready for publishing.",
          }, null, 2),
        }],
      };
    }

    case "market__get_brand_config": {
      const codes = loadBrandCodes();
      const config = codes.brands[args.brand];
      if (!config) {
        return {
          content: [{ type: "text", text: JSON.stringify({ error: `Brand not found: ${args.brand}` }) }],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(config, null, 2) }],
      };
    }

    case "market__list_brands": {
      const codes = loadBrandCodes();
      const brands = Object.values(codes.brands).map(b => ({
        id: b.id,
        name: b.name,
        tagline: b.tagline,
        archetype: b.archetype,
        url: b.url,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify({ brands, count: brands.length }, null, 2) }],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ── MCP Server ────────────────────────────────────────────
const server = new Server(
  { name: "sentaient-marketing-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    return await handleTool(name, args || {});
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

// ── Start ─────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("SentAIent Marketing MCP Server running on stdio");
