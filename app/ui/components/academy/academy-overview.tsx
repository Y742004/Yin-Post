"use client";

import { Button, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function AcademyOverview() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("/api/post").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1 className="text-xl font-bold mb-3 uppercase">Academy</h1>
      <div className="grid grid-cols-2 gap-2">
        {data?.map((i: any) => (
          <AcademyCard key={i.id} data={i} />
        ))}
      </div>
    </>
  );
}

function AcademyCard({ data }: any) {
  const defaultThumbnail =
    "https://images.ctfassets.net/h6goo9gw1hh6/3yk4VluL9upLOVhuFCaGCW/2c5a6acbf9f666559a3ec451bbfbcdd6/YouTube-Thumbnail-Size-01.jpg?w=1600&h=1024&fl=progressive&q=70&fm=jpg";

  return (
    <>
      <div className="bg-[#1b252e] p-3 rounded-2xl">
        {data?.image ? (
          <Image className="w-full aspect-video" src={data?.image} />
        ) : (
          <Image className="w-full aspect-video" src={defaultThumbnail} />
        )}

        <div className="mt-3">
          <h1>{data?.title}</h1>
          <Button
            color="primary"
            className="text-black"
            as={Link}
            size="sm"
            href={`/academy/${data?.slug}`}
          >
            Read More
          </Button>
        </div>
      </div>
    </>
  );
}
