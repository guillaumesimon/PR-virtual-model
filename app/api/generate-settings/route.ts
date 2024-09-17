import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { currentSettings } = await req.json();

    const prompt = `Given the following photoshoot settings: "${currentSettings.join(', ')}", 
    generate 5 new unique and creative setting suggestions for a fashion photoshoot. 
    Each suggestion should be brief (5-7 words) and different from the current settings. 
    Return only the list of 5 suggestions, one per line, without any introductory text or numbering.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        }
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_tokens: 200,
    });

    // Process the output to remove any unwanted text
    const rawOutput = completion?.choices?.[0]?.message?.content || '';
    const cleanedSuggestions = rawOutput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.match(/^(Here are|1\.|2\.|3\.|4\.|5\.)/i));

    // Ensure we have exactly 5 suggestions
    const newSuggestions = cleanedSuggestions.slice(0, 5);

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