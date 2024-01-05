
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth';

export async function GET() { // gets all cases
	const cases = await db.case.findMany({
		select: { name: true, image: true, price: true },
	})

	if (!cases || cases.length === 0)
		return NextResponse.json({ error: 'Case/s not found' }, { status: 404 })

	return NextResponse.json({ cases: cases }, { status: 200 })
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

    const { name, image, price, items } = data;

    if (!name || !image || !price || !items)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const newCase = await db.case.create({
        data: { name, image, price, items },
    })

    return NextResponse.json({ case: newCase }, { status: 201 })

}