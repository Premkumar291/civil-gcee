import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Notice, Event, Faculty } from '@/lib/models';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const adminPass = process.env.ADMIN_PASSWORD;

    // Direct password check instead of JWT
    if (!token || token !== adminPass) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { notices, events, faculty } = await request.json();
    await dbConnect();

    // Perform bulk updates/sync
    // For simplicity in this implementation, we clear and re-insert or update
    // But a better way for a dashboard is individual routes. 
    // Since the previous dashboard code sent the WHOLE state, we handle it here.

    if (notices) {
      await Notice.deleteMany({});
      await Notice.insertMany(notices);
    }
    
    if (events) {
      await Event.deleteMany({});
      await Event.insertMany(events);
    }

    if (faculty) {
      await Faculty.deleteMany({});
      await Faculty.insertMany(faculty);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
