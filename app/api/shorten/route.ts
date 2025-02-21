import prisma from "@/lib/db"; // Prisma client for database operations
import { nanoid } from "nanoid"; // `nanoid` is a library to generate unique, short IDs
import { NextRequest, NextResponse } from "next/server";

// Async function to handle POST requests for shortening URLs
export async function POST(request: NextRequest){

    // Step 1: Parse the request body to extract the URL
    const { url } = await request.json();

    // Step 2: Generate a unique short code using nanoid
    const shortCode = nanoid(8);

    // Step 3: Save the original URL and short code in the database using Prisma
    const shortenedUrl = await prisma.url.create({
        data: {
            originalUrl: url,
            shortCode
        }
    })
    
    // Step 4: Send a JSON response containing the short code
    return NextResponse.json({shortCode : shortenedUrl.shortCode})
}