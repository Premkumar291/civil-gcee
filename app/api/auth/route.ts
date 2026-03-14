import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPass = process.env.ADMIN_PASSWORD;

    if (password === adminPass) {
      // Just return success without JWT. We'll use the password itself as the 'token' for simplicity.
      return NextResponse.json({ success: true, token: adminPass });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
