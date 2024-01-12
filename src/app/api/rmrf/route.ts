import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
    const deletedItems = await db.item.deleteMany();
    const deletedCases = await db.case.deleteMany();

    return NextResponse.json({ item: deletedItems, case: deletedCases }, { status: 200 })
}