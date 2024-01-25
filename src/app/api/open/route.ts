import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const session = await getAuthSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await db.user.findUnique({
        where: { email: session?.user?.email || ''},
        select: { balance: true },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const body = await req.json();

    if (!body || !body.caseId) return NextResponse.json({ error: 'caseId is required' }, { status: 400 });
    const { caseId } = body;

    const caseData = await db.case.findUnique({
        where: { id: caseId },
        include: {
            odds: true
        },
    });

    if (!caseData) return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    if (user.balance < caseData.price) return NextResponse.json({ error: 'Not enough balance' }, { status: 400 });
    
    const leftBalance = user.balance - caseData.price;

    const totalOdds = caseData.odds.reduce((total, item) => total + item.Odds, 0);
    const randomNumber = Math.random() * totalOdds;

    let sum = 0;
    const selectedOdds = caseData.odds.find(item => {
        sum += item.Odds;
        return randomNumber <= sum;
    });

    const selectedItem = await db.item.findFirst({
        where: { id: selectedOdds?.itemId },
        select: {
            id: true
        }
    });

    return NextResponse.json({ item: selectedItem, leftBalance: leftBalance }, { status: 200 });
}
