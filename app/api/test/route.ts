import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    method: 'GET'
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    method: 'POST',
    receivedData: body
  });
} 