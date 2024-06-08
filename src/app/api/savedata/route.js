import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { time, size, count } = await request.json();

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

    // Insert data
    const newData = await prisma.allData.create({
      data: {
        time,
        size,
        count,
        sum: null,
        createdAt: new Date().toISOString(),
      },
    });

    // Disable caching by setting cache-control header to no-store
    const responseHeaders = {
      'Cache-Control': 'no-store',
    };

    return NextResponse.json({ message: 'Data added successfully', data: newData }, { status: 200, headers: responseHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}