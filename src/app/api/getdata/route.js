import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export const fetchCache = 'force-no-store'; // Disable caching for this module

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
    const response = NextResponse.json({ data }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}