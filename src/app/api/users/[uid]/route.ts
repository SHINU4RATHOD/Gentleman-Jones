// @ts-expect-error: declaration file for 'next/server' is not present in this project
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/connection';
import { User } from '@/models/User';

export async function GET(request: Request, context: { params: { uid: string } }) {
  await connectToDatabase();
  try {
  const { uid } = context.params;
    const user = await User.findOne({ uid }).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/users/[uid] GET', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { uid: string } }) {
  await connectToDatabase();
  try {
  const { uid } = context.params;
    const body = await request.json();
    const doc = await User.findOneAndUpdate({ uid }, body, { new: true });
    if (!doc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user: doc }, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/users/[uid] PUT', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
