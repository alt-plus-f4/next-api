import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(req : NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop();

    const items = await db.item.findMany({
        where: { id: Number(id) },
        select:{ name: true, rarity: true, price: true,  imageURL: true},
    })

    if (!items || items.length === 0)
        return NextResponse.json({ error: 'Image/s not found' }, { status: 404 })

    return NextResponse.json({ item: items }, { status: 200 })
}