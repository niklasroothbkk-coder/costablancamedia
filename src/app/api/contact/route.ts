import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + 60000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const key = getRateLimitKey(request);

  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, subject, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend, SendGrid, or similar email service
    // For now, log the contact form submission
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received successfully. We will get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
