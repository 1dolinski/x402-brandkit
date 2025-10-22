import { NextRequest, NextResponse } from 'next/server';
import { generateLogo, type BrandRequest } from '@/lib/x402-client';

export async function POST(request: NextRequest) {
  try {
    const body: BrandRequest = await request.json();

    // Validate required fields
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required and must be a string' },
        { status: 400 }
      );
    }

    const result = await generateLogo(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating logo:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate logo' },
      { status: 500 }
    );
  }
}
