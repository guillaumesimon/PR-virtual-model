import { NextResponse } from 'next/server';

const LUMA_API_URL = 'https://api.lumalabs.ai/dream-machine/v1/generations';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing animation ID' }, { status: 400 });
  }

  try {
    const response = await fetch(`${LUMA_API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.LUMA_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Luma API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Luma API status response:', data);

    if (data.state === 'completed') {
      return NextResponse.json({ status: 'completed', videoUrl: data.assets.video });
    } else if (data.state === 'failed') {
      return NextResponse.json({ status: 'failed', error: data.failure_reason });
    } else {
      return NextResponse.json({ status: 'processing' });
    }
  } catch (error) {
    console.error('Error checking animation status:', error);
    return NextResponse.json({ error: 'Failed to check animation status' }, { status: 500 });
  }
}