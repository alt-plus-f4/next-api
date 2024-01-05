
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth';


export async function POST(req : NextRequest) {
    //! AUTH SHOULD ADD
	// const session = await getAuthSession();

	// if (!session)
	// 	return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // const user = await db.user.findUnique({
    //     where: { email: session?.user?.email || ''},
    //     select: { role: true },
    // })

    // if(user?.role != 1)
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const data = await req.json();

    if (Object.keys(data).length === 0) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const { name, rarity, price, imageURL } = data;

    if (!name || !rarity || !price || !imageURL)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const newItem = await db.item.create({
        data: { name, rarity, price, imageURL },
    })

    return NextResponse.json({ item: newItem }, { status: 201 })

}