import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Fetch admin user by email
    const admin = await prisma.admin.findUnique({
      where: { email: username },
    });

    if (!admin) {
      return NextResponse.json("Admin Doesn't exist", { status: 400 });
    }

    // Check password
    if (password !== admin.password) {
      return NextResponse.json("Password incorrect, please check", { status: 400 });
    }

    return NextResponse.json("Login Successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}