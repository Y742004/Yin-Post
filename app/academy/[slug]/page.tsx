"use client";

import RichTextView from "@/app/ui/components/block-node/rich-text-view";
import TailwindEditorView from "@/app/ui/components/rich-text/ok-use-view";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function Page({ params }: any) {
  const [isMM, setIsMM] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData", params.slug],
    queryFn: () => fetch(`/api/post/${params.slug}`).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="max-w-lg mx-auto pt-10 p-3">
        <div className="flex justify-between items-center mb-3">
          <Button as={Link} href="/" size="sm">
            Back
          </Button>

          <div className="flex justify-end items-center">
            <Button onClick={() => setIsMM(false)} size="sm">
              EN
            </Button>
            <Button onClick={() => setIsMM(true)} size="sm">
              MM
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">{data?.title}</h1>

        {!isMM && <RichTextView textData={data?.description} />}

        {isMM && <TailwindEditorView content={JSON.parse(data?.contentMM)} />}
      </div>
    </>
  );
}
