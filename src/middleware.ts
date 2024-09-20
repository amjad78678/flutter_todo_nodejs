import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  console.log("API Key: ", apiKey);

  if (apiKey === process.env.MY_API_KEY) {
    return NextResponse.next(); 
  } else {
    return NextResponse.json(
      { message: "Forbidden: Invalid API Key" },
      { status: 403 }
    );
  }
}

// Specify the routes to apply this middleware to
export const config = {
  matcher: ["/api/:path*"], // Apply to all API routes
};
