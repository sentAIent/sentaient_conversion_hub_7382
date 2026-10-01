import { NextResponse } from "next/server";

// Simulating a live sports data feed
// In production, this would query a Redis cache or a provider like Sportradar

const PLAYERS = [
  { id: "cmc", name: "Christian McCaffrey", team: "SF", position: "RB" },
  { id: "jj", name: "Justin Jefferson", team: "MIN", position: "WR" },
  { id: "pm", name: "Patrick Mahomes", team: "KC", position: "QB" },
  { id: "tyreek", name: "Tyreek Hill", team: "MIA", position: "WR" },
  { id: "cd", name: "CeeDee Lamb", team: "DAL", position: "WR" },
];

const EVENT_TYPES = [
  { type: "RUSH", desc: "rushes for [Y] yards", min: -2, max: 25 },
  { type: "PASS", desc: "passes for [Y] yards", min: 5, max: 45 },
  { type: "RECEPTION", desc: "catches a pass for [Y] yards", min: -1, max: 35 },
  { type: "TOUCHDOWN", desc: "scores a TOUCHDOWN!", min: 0, max: 0, overrideYards: 0 },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function GET() {
  // Generate 1 to 3 random live events
  const numEvents = getRandomInt(1, 3);
  const events = [];

  for (let i = 0; i < numEvents; i++) {
    const player = PLAYERS[getRandomInt(0, PLAYERS.length - 1)];
    const eventType = EVENT_TYPES[getRandomInt(0, EVENT_TYPES.length - 1)];
    
    // Filter unrealistic events (e.g., QBs don't usually get receptions in this sim)
    if (player.position === "QB" && eventType.type === "RECEPTION") continue;
    if (player.position === "WR" && eventType.type === "PASS") continue;

    const yards = eventType.overrideYards !== undefined ? eventType.overrideYards : getRandomInt(eventType.min, eventType.max);
    
    let description = eventType.desc.replace("[Y]", yards.toString());
    
    events.push({
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      playerId: player.id,
      playerName: player.name,
      team: player.team,
      type: eventType.type,
      yards: yards,
      description: `${player.name} ${description}`,
      fantasyPoints: calculateFantasyPoints(eventType.type, yards),
    });
  }

  return NextResponse.json({
    status: "live",
    gameClock: "Q3 10:45",
    events: events,
  });
}

function calculateFantasyPoints(type: string, yards: number) {
  let pts = 0;
  if (type === "RECEPTION") pts += 1; // Full PPR
  if (type === "TOUCHDOWN") pts += 6;
  if (type === "PASS") pts += (yards * 0.04);
  if (type === "RUSH" || type === "RECEPTION") pts += (yards * 0.1);
  return parseFloat(pts.toFixed(2));
}
