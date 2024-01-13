import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
    const deletedItems = await db.item.deleteMany();
    const deletedCases = await db.case.deleteMany();

    await db.$executeRaw`ALTER TABLE \`Item\` AUTO_INCREMENT = 1`;
    await db.$executeRaw`ALTER TABLE \`Case\` AUTO_INCREMENT = 1`;

    return NextResponse.json({ item: deletedItems, case: deletedCases }, { status: 200 })
}