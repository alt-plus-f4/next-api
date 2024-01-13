import { db } from "@/lib/db";
import { checkSessionAndRole } from "@/lib/role-check";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const check = await checkSessionAndRole();
    if (check) return NextResponse.json({ error: check.error }, { status: check.status });

    const data = await req.json();

    if (!Array.isArray(data.items)) 
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })


    const newItems = await db.item.createMany({
        data: data.items.map(({ name, rarity, price, imageURL }: { name: string, rarity: number, price: number, imageURL: string }) => ({
            name, rarity, price, imageURL
        })),
    })

    return NextResponse.json({ items: newItems }, { status: 201 })
}