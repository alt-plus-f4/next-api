import { getAuthSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(req : NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ token: session }, { status: 200 });


  const user = await db.user.findUnique({
    where: { email: session?.user?.email || ''},
    select: { role: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ role: user?.role }, { status: 200 })
}

export async function POST(req : NextRequest) {
    const session = await getAuthSession();
  
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  
    const user = await db.user.update({
        where: { email: session?.user?.email || ''},
        data:  { role: 1 },
    })
  
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
  
    return NextResponse.json({ role: user.role }, { status: 200 })
  }
  
