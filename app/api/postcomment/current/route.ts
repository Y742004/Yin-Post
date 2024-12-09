import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const postId = req.nextUrl.searchParams.get("postId");

  const toRead = await db.postComment.findMany({
    where: { postId,
      
    },
    include: { user: true, post: true },
    // include: { User: true, Post: true },
  });
  return NextResponse.json(toRead);
}

 