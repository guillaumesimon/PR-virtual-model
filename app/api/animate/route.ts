import { NextResponse } from 'next/server';

const LUMA_API_URL = 'https://api.lumalabs.ai/dream-machine/v1/generations';

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const response = await fetch(LUMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LUMA_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: "Create a smooth, slow horizontal traveling shot of this fashion model. The camera should move gently from left to right, revealing more of the scene. Maintain a steady, cinematic pace throughout the animation.",
        keyframes: {
          frame0: {
            type: "image",
            url: imageUrl
          }
        },
        loop: true,
      }),
    });

    const responseData = await response.text();
    console.log('Luma API raw response:', responseData);

    if (!response.ok) {
      throw new Error(`Luma API request failed with status ${response.status}: ${responseData}`);
    }

    let data;
    try {
      data = JSON.parse(responseData);
    } catch (parseError) {
      console.error('Error parsing Luma API response:', parseError);
      throw new Error('Invalid response from Luma API');
    }

    console.log('Luma API parsed response:', data);

    if (!data.id) {
      throw new Error('No animation ID returned from Luma API');
    }

    return NextResponse.json({ animationId: data.id });
  } catch (error) {
    console.error('Error animating image:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}