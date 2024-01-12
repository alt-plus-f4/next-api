import { getAuthSession } from "./auth";
import { db } from "./db";

export async function checkSessionAndRole() {
    const session = await getAuthSession();

    if (!session)
        return { status: 401, error: 'Unauthorized' }

    const user = await db.user.findUnique({
        where: { email: session?.user?.email || '' },
        select: { role: true },
    })

    if (user?.role != 1)
        return { status: 401, error: 'Unauthorized' }

    return null;
}