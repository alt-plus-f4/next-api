
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth';

export async function GET() {
	const items = await db.item.findMany({
		select: { name: true, rarity: true, price: true, imageURL: true },
	})

	if (!items || items.length === 0)
		return NextResponse.json({ error: 'Item/s not found' }, { status: 404 })

	return NextResponse.json({ items: items }, { status: 200 })
}

export async function POST(req : NextRequest) {
	const session = await getAuthSession();

	if (!session)
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await db.user.findUnique({
        where: { email: session?.user?.email || ''},
        select: { role: true },
    })

    if(user?.role != 1)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const data = await req.json();

    if (Object.keys(data).length === 0) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const { name, rarity, price, imageURL } = data;

    if (!name || !rarity || !price || !imageURL)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const newItem = await db.item.create({
        data: { name, rarity, price, imageURL, caseId: 1 },
    })

    return NextResponse.json({ item: newItem }, { status: 201 })

}