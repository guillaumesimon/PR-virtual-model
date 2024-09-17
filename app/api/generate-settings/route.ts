import { NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
  try {
    const { currentSettings } = await req.json();

    const prompt = `Given the following photoshoot settings: "${currentSettings.join(', ')}", 
    generate 5 new unique and creative setting suggestions for a fashion photoshoot. 
    Each suggestion should be brief (5-7 words) and different from the current settings. 
    Return only the list of 5 suggestions, one per line, without any introductory text or numbering.`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const rawOutput = data.choices?.[0]?.message?.content || '';

    // Process the output to remove any unwanted text
    // Process the output to remove unwanted text and ensure we have exactly 5 suggestions
    const cleanedSuggestions = rawOutput
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line && !line.match(/^(Here are|1\.|2\.|3\.|4\.|5\.)/i));

    const newSuggestions = cleanedSuggestions.slice(0, 5);

    // Log the cleaning process for debugging
    console.log('Raw output:', rawOutput);
    console.log('Cleaned suggestions:', cleanedSuggestions);
    console.log('Final suggestions:', newSuggestions);

    // Log the generated suggestions for tracking
    console.log('Generated setting suggestions:', newSuggestions);

    return NextResponse.json({ suggestions: newSuggestions });
  } catch (error) {
    console.error('Error generating setting suggestions:', error);
    // Log more details about the error for debugging
    console.log('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: 'Failed to generate setting suggestions' }, { status: 500 });
  }
}