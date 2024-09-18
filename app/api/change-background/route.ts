import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const PHOTOROOM_API_URL = 'https://image-api.photoroom.com/v2/edit';

export async function POST(req: Request) {
  console.log('Background change request received');
  try {
    const { imageUrl } = await req.json();
    console.log('Image URL received:', imageUrl);

    if (!imageUrl) {
      console.error('No image URL provided');
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    console.log('Generating background prompt using Groq API');
    const promptResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ 
          role: "user", 
          content: "Generate a single, creative and visually appealing background description for a fashion photoshoot. The description should be brief (10-15 words) and suitable for an AI image generator. Provide only the description without any introductory text or additional context." 
        }],
        temperature: 0.7,
        max_tokens: 30,
      }),
    });

    if (!promptResponse.ok) {
      console.error(`Groq API request failed with status ${promptResponse.status}`);
      throw new Error(`Groq API request failed with status ${promptResponse.status}`);
    }

    const promptData = await promptResponse.json();
    const backgroundPrompt = promptData.choices[0].message.content.trim();
    console.log('Generated background prompt:', backgroundPrompt);

    // Construct the Photoroom API URL with query parameters
    const photoroomUrl = new URL(PHOTOROOM_API_URL);
    photoroomUrl.searchParams.append('imageUrl', imageUrl);
    photoroomUrl.searchParams.append('background.prompt', backgroundPrompt);
    photoroomUrl.searchParams.append('background.expandPrompt', 'auto');
    photoroomUrl.searchParams.append('outputSize', '1024x1024');

    console.log('Photoroom API request details:');
    console.log('URL:', photoroomUrl.toString());
    console.log('Method: GET');

    console.log('Sending request to Photoroom API');
    const photoroomResponse = await fetch(photoroomUrl.toString(), {
      method: 'GET',
      headers: {
        'x-api-key': process.env.PHOTOROOM_API_KEY as string,
      },
    });

    console.log('Photoroom API response status:', photoroomResponse.status);

    if (!photoroomResponse.ok) {
      console.error(`Photoroom API request failed with status ${photoroomResponse.status}`);
      const errorText = await photoroomResponse.text();
      console.error('Photoroom API error details:', errorText);
      throw new Error(`Photoroom API request failed with status ${photoroomResponse.status}`);
    }

    console.log('Photoroom API request successful');
    const editedImageBuffer = await photoroomResponse.buffer();
    console.log('Edited image buffer received, size:', editedImageBuffer.length, 'bytes');

    // Convert buffer to base64
    const base64Image = editedImageBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    return NextResponse.json({ newImageUrl: dataUrl });
  } catch (error) {
    console.error('Error changing background:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}