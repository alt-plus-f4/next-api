
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'
import { checkSessionAndRole } from '@/lib/role-check';

export async function GET() { // gets all cases
    const cases = await db.case.findMany({
		select: { id: true, name: true, image: true, price: true, items: true, odds: true },
	})

	if (!cases || cases.length === 0)
		return NextResponse.json({ error: 'Case/s not found' }, { status: 404 })

	return NextResponse.json({ cases: cases }, { status: 200 })
}

export async function POST(req : NextRequest) {
	const check = await checkSessionAndRole();
    if (check) return NextResponse.json({ error: check.error }, { status: check.status });

    const data = await req.json();

    if (Object.keys(data).length === 0) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

        const { name, image, price, itemIds, odds } = data;

    if (!name || !image || !price || !itemIds || !odds)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    
    const newCase = await db.case.create({
        data: {
            name, image, price,
            items: {
                connect: itemIds.map((id: string, index: number) => ({ id })),
            },
            odds: {
                create: itemIds.map((id: string, index: number) => ({
                    itemId: id,
                    Odds: odds[index],
                })),
            },
        },
    })
    
    return NextResponse.json({ case: newCase }, { status: 201 })
}

export async function PUT(req: NextRequest) {
    // const check = await checkSessionAndRole();
    // if (check) return NextResponse.json({ error: check.error }, { status: check.status });
    
    const id = Number(req.nextUrl.searchParams.get('id'));

    if (isNaN(id))
        return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 });

    const data = await req.json();

    if (Object.keys(data).length === 0) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const { name, image, price, itemIds, odds } = data;

    if (!name || !image || !price || !itemIds || !odds)
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const updatedCase = await db.case.update({
        where: { id },
        data: {
            name, 
            image, 
            price,
            items: {
                connect: itemIds.map((id: string) => ({ id })),
            },
        },
    })

    return NextResponse.json({ case: updatedCase }, { status: 200 })
}
export async function DELETE(req: NextRequest) {
    const check = await checkSessionAndRole();
    if (check) return NextResponse.json({ error: check.error }, { status: check.status });
    
    const id = Number(req.nextUrl.searchParams.get('id'));

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id parameter' }, { status: 400 });
    }

    const item = await db.item.findUnique({
        where: { id },
    });

    if (!item) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const deletedItem = await db.item.delete({
        where: { id },
    });

    return NextResponse.json({ item: deletedItem }, { status: 200 })
}