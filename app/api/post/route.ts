import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

const toRead = await db.post.findMany(
  {
    include: { user: true,  },
  }
  //   {
  // include: { user: true,  },}
);
return NextResponse.json(toRead);
}
 
 

export async function POST(req: NextRequest, res: NextResponse) {
  const wow = await req.json();
  const toCreate = await db.post.create({
    data: {
       content: wow.content,
      userId: wow.userId
    },
  });
  return NextResponse.json(toCreate);
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const wow = await req.json();
  const toDelete = await db.post.delete({
    where: {
      id: wow.id,
    },
  });
  return NextResponse.json(toDelete);
}
