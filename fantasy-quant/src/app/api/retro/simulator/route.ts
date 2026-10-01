import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Baseline simulation (no swaps)
  const baseline = getWeeklySimulation({});

  return NextResponse.json({
    success: true,
    initialDraftPicks,
    roundAlternatives,
    baseline
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { swappedPicks } = body; // Record<number, string> round -> player

    const simulation = getWeeklySimulation(swappedPicks || {});

    return NextResponse.json({
      success: true,
      simulation
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 400 });
  }
}
