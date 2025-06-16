import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Use this for testing
        to: 'yvelkuri@idealtechnosoft.com',
        subject: `ITS Contact Form: ${name}`,
        html: `
          <h2>New Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    if (!response.ok) throw new Error('Email failed');

    const result = await response.json();
    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}