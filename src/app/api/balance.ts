import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401);
    return res.json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return handleGet(req, res, session?.user?.email || '');
  } else if (req.method === 'POST') {
    return handlePost(req, res, session?.user?.email || '');
  } else {
    res.status(406);
    return res.json({ error: 'Method Not Allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404);
      return res.json({ error: 'User not found.' });
    }

    res.status(200);
    return res.json({
      balance: user.balance,
    });
  } catch (error) {
    console.error('Error fetching user balance:', error);
    res.status(500);
    return res.json({ error: 'Internal server error.' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404);
      return res.json({ error: 'User not found.' });
    }

    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      res.status(400);
      return res.json({ error: 'Invalid amount.' });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        balance: {
          increment: parseFloat(amount),
        },
      },
    });

    res.status(200);
    return res.json({
      balance: updatedUser.balance,
    });
  } catch (error) {
    console.error('Error adding funds:', error);
    res.status(500);
    return res.json({ error: 'Internal server error.' });
  }
}