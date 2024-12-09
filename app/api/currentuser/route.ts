import { auth } from "@/auth";
import { db } from "@/lib/db";
import { get } from "http";
import { NextResponse } from "next/server";

export async function GET() {
    const authLay = await auth();

    try {
        const getCurrentUser = await db.user.findFirst({
            where: {
                email: authLay?.user?.email as string,
            },
         });
        
        
    return NextResponse.json(getCurrentUser);
    }
    catch (error) {
        console.log(error);
    }

 
}