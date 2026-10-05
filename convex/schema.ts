import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    role: v.union(v.literal("visitor"), v.literal("guide")),
    status: v.union(v.literal("available"), v.literal("busy"), v.literal("offline")),
    lastSeen: v.number(), // timestamp for presence
    expertise: v.optional(v.array(v.string())), // for guides
  }).index("by_role_status", ["role", "status"]),

  meetings: defineTable({
    visitorId: v.id("users"),
    guideId: v.optional(v.id("users")),
    status: v.union(v.literal("waiting"), v.literal("active"), v.literal("completed")),
    worldPosition: v.optional(v.object({
      x: v.number(),
      y: v.number(),
      z: v.number()
    })),
    startedAt: v.number(),
  }).index("by_visitor", ["visitorId"])
    .index("by_status", ["status"]),
});
