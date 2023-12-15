import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  if (!req.headers) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { caseName } = body;
    console.log(`User opened ${caseName}`);
    return NextResponse.json({ error: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error handling API request:', (error as Error).message);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
