import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(req : NextRequest) {
    const id = req.nextUrl.pathname.split('/').pop();

    const cases = await db.case.findMany({
        where: { id: Number(id) },
        select:{ name: true, image: true, price: true, items: true,  history: true},
    })

    if (!cases || cases.length === 0)
        return NextResponse.json({ error: 'Case/s not found' }, { status: 404 })

    return NextResponse.json({ cases: cases }, { status: 200 })
}