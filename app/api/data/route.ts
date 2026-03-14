import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Notice, Event, Faculty } from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();
    
    const [notices, events, faculty] = await Promise.all([
      Notice.find({}).sort({ date: -1 }),
      Event.find({}).sort({ date: -1 }),
      Faculty.find({}).sort({ order: 1, isHead: -1 })
    ]);

    return NextResponse.json({
      notices,
      events,
      faculty
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
