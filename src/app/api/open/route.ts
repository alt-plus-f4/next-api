import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body || !body.caseId) {
        return NextResponse.json({ error: 'caseId is required' }, { status: 400 });
    }

    const { caseId } = body;

    const caseData = await db.case.findUnique({
        where: { id: caseId },
        include: { odds: true }
    });

    if (!caseData) {
        return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    const totalOdds = caseData.odds.reduce((total, item) => total + item.Odds, 0);
    const randomNumber = Math.random() * totalOdds;

    let sum = 0;
    const selectedItem = caseData.odds.find(item => {
        sum += item.Odds;
        return randomNumber <= sum;
    });

    return NextResponse.json({ item: selectedItem }, { status: 200 });
}