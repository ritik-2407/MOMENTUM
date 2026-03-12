import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db/db";
import Donts from "../../lib/models/Donts.model";

export async function GET(req: Request){

    try {
        
        const session = await getServerSession(authOptions)
        
        if(!session || !session.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }
        
        await connectDB()
        
        const donts = await Donts.find({userId: (session.user as any).id})
        return NextResponse.json({donts}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}

export async function POST(req: Request){
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        await connectDB()

        const {dont} = await req.json()

        if(!dont){
            return NextResponse.json({error: "Dont cannot be empty"}, {status: 400})
        }

        const newDont = await Donts.create({
            dont,
            userId: (session.user as any).id
        })

        return NextResponse.json({message: "Dont created successfully", dont: newDont}, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}

export async function DELETE(req: Request){
    try {
        const session = await getServerSession(authOptions)
        if(!session || !session.user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        await connectDB()

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if(!id){
            return NextResponse.json({error: "ID is required"}, {status: 400})
        }

        const deletedDont = await Donts.findByIdAndDelete(id)
        if (!deletedDont) {
            return NextResponse.json({error: "Dont not found"}, {status: 404})
        }

        return NextResponse.json({message: "Dont deleted successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}