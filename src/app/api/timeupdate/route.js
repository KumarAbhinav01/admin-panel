import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { time } = await request.json();

    // Ensure the table exists
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "TimeSprint" (
        id SERIAL PRIMARY KEY,
        userid INT,
        time varchar(255) NOT NULL,
        status varchar(255),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert or update time
    await prisma.timeSprint.upsert({
      where: { id: 1 }, // Add the id field in the where clause
      update: { time },
      create: { userid: 1, time, status: 'updated' },
    });

    return NextResponse.json({ message: 'Time Updated successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(request) {
    try {
      // Fetch the time from the database
      const timeSprint = await prisma.timeSprint.findUnique({ where: { id: 1 } });
      if (!timeSprint) {
        return NextResponse.json({ error: 'Time not found' }, { status: 404 });
      }
  
      return NextResponse.json({ time: timeSprint.time }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }