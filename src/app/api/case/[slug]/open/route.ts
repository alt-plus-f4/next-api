import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function POST(req : NextRequest) {
	// const session = await getAuthSession();

	// if (!session)
	// 	return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await req.json();

    if (Object.keys(data).length === 0) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const { name, image, price } = data;

    if (!name || !image || !price)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const newCase = await db.case.create({
        data: { name, image, price },
    })

    return NextResponse.json({ case: newCase }, { status: 201 })

}