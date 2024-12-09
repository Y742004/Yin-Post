import AuthJSData from "../ui/components/AuthJSData";

import dynamic from "next/dynamic";

const BlockNodeRichTextEditor = dynamic(
  () => import("@/app/ui/components/block-node/BlockNodeRichTextEditor"),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <h1>Testing BB</h1>
      <BlockNodeRichTextEditor />
      <AuthJSData />
    </>
  );
}
