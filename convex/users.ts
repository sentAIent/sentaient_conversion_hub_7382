import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create or update a user (Guide or Visitor)
export const registerUser = mutation({
  args: {
    name: v.string(),
    role: v.union(v.literal("visitor"), v.literal("guide")),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      role: args.role,
      status: args.role === "guide" ? "available" : "busy", // Visitors don't need availability
      lastSeen: Date.now(),
    });
    return userId;
  },
});

export const updatePresence = mutation({
  args: {
    userId: v.id("users"),
    status: v.union(v.literal("available"), v.literal("busy"), v.literal("offline")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      status: args.status,
      lastSeen: Date.now(),
    });
  },
});

export const getAvailableGuides = query({
  handler: async (ctx) => {
    const now = Date.now();
    // Fetch guides who are marked available and have pinged in the last 60 seconds
    const guides = await ctx.db
      .query("users")
      .withIndex("by_role_status", (q) => q.eq("role", "guide").eq("status", "available"))
      .collect();
    
    return guides.filter((g) => now - g.lastSeen < 60000);
  },
});
