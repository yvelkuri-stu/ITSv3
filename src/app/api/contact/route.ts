import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { name, email, message, company, projectType, timestamp, source } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' }, 
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' }, 
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' }, 
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly.' }, 
        { status: 500 }
      );
    }

    // Prepare email content
    const emailSubject = `${company ? `[${company}] ` : ''}New Contact Form Submission from ${name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #374151;">Message</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>

        <div style="background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #6b7280;">Submission Details</h4>
          <p><strong>Timestamp:</strong> ${timestamp || new Date().toISOString()}</p>
          <p><strong>Source:</strong> ${source || 'website'}</p>
          <p><strong>User Agent:</strong> ${request.headers.get('user-agent') || 'Unknown'}</p>
          <p><strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This email was automatically generated from the Ideal Technosoft website contact form.
          </p>
        </div>
      </div>
    `;

    // Send email via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website Contact Form <onboarding@resend.dev>', // Use verified domain in production
        to: ['yeshu501@gmail.com'], // Use your verified email for testing
        subject: emailSubject,
        html: emailHtml,
        // Add reply-to for better email handling
        reply_to: email
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      const errorData = JSON.parse(errorText);
      
      console.error('Resend API error:', {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        error: errorText
      });
      
      // Handle specific Resend testing limitation
      if (emailResponse.status === 403 && errorData.message?.includes('testing emails')) {
        // For development/testing - just log the form data and return success
        console.log('📧 Contact form submission (testing mode):', {
          name,
          email,
          company,
          projectType,
          message: message.substring(0, 100) + '...',
          timestamp
        });
        
        return NextResponse.json({ 
          success: true, 
          message: 'Form submitted successfully! (Development mode - email logged to console)',
          mode: 'development'
        });
      }
      
      throw new Error(`Email service error: ${emailResponse.status}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      emailId: emailResult.id 
    });

  } catch (error) {
    console.error('Contact form API error:', error);
    
    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to send message. Please try again or contact us directly.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}