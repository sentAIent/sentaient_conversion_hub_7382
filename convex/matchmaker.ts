import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// The AI calls this when a visitor needs a guide
export const requestGuide = mutation({
  args: {
    visitorId: v.id("users"),
    worldPosition: v.object({
      x: v.number(),
      y: v.number(),
      z: v.number(),
    })
  },
  handler: async (ctx, args) => {
    // 1. Find an available guide
    const now = Date.now();
    const availableGuides = await ctx.db
      .query("users")
      .withIndex("by_role_status", (q) => q.eq("role", "guide").eq("status", "available"))
      .collect();

    const onlineGuides = availableGuides.filter(g => now - g.lastSeen < 60000);

    if (onlineGuides.length === 0) {
      // No guides available right now
      return await ctx.db.insert("meetings", {
        visitorId: args.visitorId,
        status: "waiting",
        worldPosition: args.worldPosition,
        startedAt: now,
      });
    }

    // 2. Pick a guide (simple random choice for now)
    const selectedGuide = onlineGuides[Math.floor(Math.random() * onlineGuides.length)];

    // 3. Mark guide as busy
    await ctx.db.patch(selectedGuide._id, { status: "busy" });

    // 4. Create the meeting
    const meetingId = await ctx.db.insert("meetings", {
      visitorId: args.visitorId,
      guideId: selectedGuide._id,
      status: "active",
      worldPosition: args.worldPosition,
      startedAt: now,
    });

    return meetingId;
  },
});

// Guide listens to this to know if they've been pulled into a meeting
export const getActiveMeetingForGuide = query({
  args: { guideId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.guideId) return null;
    
    // In a real app we'd use an index on guideId, but for prototype we can filter
    const meetings = await ctx.db
      .query("meetings")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
      
    return meetings.find(m => m.guideId === args.guideId) || null;
  }
});

export const getActiveMeetingForVisitor = query({
  args: { visitorId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.visitorId) return null;
    
    const meeting = await ctx.db
      .query("meetings")
      .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
      .first();
      
    return meeting;
  }
});

export const endMeeting = mutation({
  args: { meetingId: v.id("meetings") },
  handler: async (ctx, args) => {
    const meeting = await ctx.db.get(args.meetingId);
    if (!meeting) return;
    
    await ctx.db.patch(args.meetingId, { status: "completed" });
    
    if (meeting.guideId) {
      await ctx.db.patch(meeting.guideId, { status: "available" });
    }
  }
});
