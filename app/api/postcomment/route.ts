import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const toRead = await db.postComment.findMany({
    include: { user: true, post: true },
  });
  return NextResponse.json(toRead);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const wow = await req.json();
  const toCreate = await db.postComment.create({
    data: {
      text: wow.text,
      postId: wow.postId,
      userId: wow.userId,
    },
  });
  return NextResponse.json(toCreate);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const wow = await req.json();
  const toDelete = await db.postComment.delete({
    where: {
      id: wow.id,
    },
  });
  return NextResponse.json(toDelete);
}
