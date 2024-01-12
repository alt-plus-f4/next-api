
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth';

export async function GET(req : NextRequest) {
    const from = Number(req.nextUrl.searchParams.get('from'));
    const to = Number(req.nextUrl.searchParams.get('to'));

    if ((isNaN(from) || isNaN(to)) && (from !== 0 && to !== 0)) {
        return NextResponse.json({ error: 'Invalid from or to parameter' }, { status: 400 });
    }

    let items;
    try {
        if (from === 0 && to === 0) {
            items = await db.item.findMany({
                select: {id: true, name: true, rarity: true, price: true, imageURL: true},
            });
        } else {
            items = await db.item.findMany({
                select: {name: true, rarity: true, price: true, imageURL: true},
                where: {
                    id: {
                      lte: to,
                      gte: from,
                    },
                },
            });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

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

export async function PUT(req : NextRequest) {
    const id = Number(req.nextUrl.searchParams.get('id'));

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 });
    }

    const data = await req.json();

    if (Object.keys(data).length === 0) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const { name, rarity, price, imageURL} = data;

    if (!name || !rarity || !price || !imageURL)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const updatedItem = await db.item.update({
        where: { id },
        data: { name, rarity, price, imageURL},
    })

    return NextResponse.json({ item: updatedItem }, { status: 200 })
}

export async function DELETE(req : NextRequest) {
    const id = Number(req.nextUrl.searchParams.get('id'));

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 });
    }

    const deletedItem = await db.item.delete({
        where: { id },
    });

    return NextResponse.json({ item: deletedItem }, { status: 200 })
}