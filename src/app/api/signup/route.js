import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Ensure the table exists
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Admin" (
      id SERIAL PRIMARY KEY,
      NAME varchar(255),
      EMAIL varchar(255) UNIQUE,
      PASSWORD varchar(255),
      STATUS varchar(255)
    );`;

    // Insert default data if needed
    const existingUser = await prisma.admin.findUnique({
      where: { email: 'chinmay@123' },
    });

    if (!existingUser) {
      await prisma.admin.create({
        data: {
          name: 'Chinmay',
          email: 'chinmay@123',
          password: '12345678',
          status: 'true',
        },
      });
    }

    const users = await prisma.admin.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Ensure the table exists
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "Admin" (
      id SERIAL PRIMARY KEY,
      NAME varchar(255),
      EMAIL varchar(255) UNIQUE,
      PASSWORD varchar(255),
      STATUS varchar(255)
    );`;

    const newUser = await prisma.admin.create({
      data: { name, email, password, status: 'active' },
    });

    return NextResponse.json({ message: 'Signup Successful', user: newUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
