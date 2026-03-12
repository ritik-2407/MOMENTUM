import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://zenquotes.io/api/random", {
            cache: "no-store",
        });
        
        if (!res.ok) {
            throw new Error("Failed to fetch from zenquotes");
        }
        
        const data = await res.json();
        
        if (data && data.length > 0) {
            return NextResponse.json({
                quote: data[0].q,
                author: data[0].a
            }, { status: 200 });
        }
        
        throw new Error("Invalid quote format");
    } catch (error) {
        // Fallback motivational quote just in case
        return NextResponse.json({
            quote: "Dreams are the blueprint; action is the architect.",
            author: "Momentum"
        }, { status: 200 });
    }
}
