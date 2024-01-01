import { getAuthSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(req : NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { email: session?.user?.email || ''},
    select: { balance: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ balance: user.balance }, { status: 200 })
}

export async function POST(req : NextRequest) {
  const session = await getAuthSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { email: session?.user?.email || ''},
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const { balance } = await req.json();
  const parsedBalance = parseFloat(balance);

  if (isNaN(parsedBalance)) {
    return NextResponse.json({ error: 'Invalid balance' }, { status: 400 })
  }

  const updatedUser = await db.user.update({
    where: { email: user.email },
    data: { balance },
  })

  return NextResponse.json({ balance: updatedUser.balance }, { status: 200 })
}