// @ts-ignore: no declaration file for 'next/server'
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connection';
import { User } from '@/models/User';

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const { uid, email, displayName, firstName, lastName, roles } = body;

    if (!uid || !email) {
      return NextResponse.json({ error: 'Missing uid or email' }, { status: 400 });
    }

    const update = {
      uid,
      email,
      displayName,
      firstName,
      lastName,
      roles: roles || [],
    };

    const doc = await User.findOneAndUpdate({ uid }, update, { upsert: true, new: true });

    return NextResponse.json({ user: doc }, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/users POST', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
