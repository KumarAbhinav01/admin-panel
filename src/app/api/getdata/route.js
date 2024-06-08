import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Ensure the table exists
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "AllData" (
        id SERIAL PRIMARY KEY,
        TIME varchar(255),
        SIZE varchar(255),
        COUNT varchar(255),
        SUM varchar(255),
        CREATED_AT timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Fetch data from the table
    const data = await prisma.allData.findMany();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}