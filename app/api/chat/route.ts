import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request: "messages" array is required.' },
        { status: 400 }
      );
    }

    // 1. Read personal data from mydata.txt
    let myData = '';
    try {
      const filePath = path.join(process.cwd(), 'mydata.txt');
      if (fs.existsSync(filePath)) {
        myData = fs.readFileSync(filePath, 'utf-8');
      } else {
        myData = 'G. Chanakya Sree Harsha is a Data Analyst, SQL & Power BI Developer based in Hyderabad, India. Email: chanakyasreeharsha@gmail.com.';
      }
    } catch (fsError) {
      console.error('Failed to read mydata.txt:', fsError);
      myData = 'G. Chanakya Sree Harsha is a Data Analyst, SQL & Power BI Developer based in Hyderabad, India.';
    }

    // 2. Validate Gemini API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        text: 'Hi! I am Chanakya\'s AI assistant. To activate my brain, please add your `GEMINI_API_KEY` to the `.env.local` file and restart the development server.',
      });
    }

    // 3. Construct System Instructions
    const systemPrompt = `You are Chanakya's portfolio AI assistant. 
Your goal is to answer user questions about Chanakya (his skills, experience, education, projects, contact details, certifications) based ONLY on the personal data provided below.

Strict Constraints:
1. Respond to user questions based ONLY on the provided personal data.
2. DO NOT give any other answer apart from the provided personal data.
3. If a question is unrelated to Chanakya, or if the answer is not present in the provided personal data, you must politely respond: "I'm sorry, but I can only answer questions about Chanakya based on his official portfolio data."
4. Do not make up any facts or details about his career that are not explicitly documented in the personal data.
5. Keep your responses concise, professional, and friendly.

Here is Chanakya's official personal data:
------------------------------------------
${myData}
------------------------------------------`;

    // 4. Format chat history for Gemini API
    // Gemini API expects roles to be either "user" or "model"
    const formattedContents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    // 5. Send POST request to Gemini 2.5 Flash API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          temperature: 0.1, // low temperature to ensure accuracy to mydata.txt
          maxOutputTokens: 800,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      let userFriendlyMessage = 'Failed to generate response from AI model.';
      
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error?.code === 503) {
          userFriendlyMessage = 'The AI model is currently experiencing high demand. Spikes in demand are temporary. Please try sending your message again in a few moments.';
        } else if (errorJson.error?.message) {
          userFriendlyMessage = `AI Error: ${errorJson.error.message}`;
        }
      } catch (e) {
        // ignore parsing errors
      }

      return NextResponse.json({
        success: false,
        message: userFriendlyMessage,
      });
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.error('Invalid Gemini Response Format:', JSON.stringify(data));
      return NextResponse.json(
        { success: false, message: 'AI returned an empty or invalid response.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      text: candidateText,
    });
  } catch (error) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
