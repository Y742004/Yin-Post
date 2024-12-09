"use client";

import { Editor } from "novel";
// import { defaultExtensions } from "novel/extensions";
import { useState } from "react";

const TailwindEditor = ({
  content,
  setContent,
}: {
  content?: any;
  setContent?: any;
}) => {
  //   const [content, setContent] = useState<any>(null);

  const initialContent = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Start writing here...",
          },
        ],
      },
    ],
  };

  return (
    <div className="relative w-full max-w-screen-lg mx-auto">
      <Editor
        defaultValue={initialContent}
        disableLocalStorage={true}
        onUpdate={(editor) => {
          console.log({ editor: editor?.getJSON() });
          const json = editor?.getJSON();
          setContent(json);
        }}
        // onUpdate={({ editor }) => {
        //   console.log({ editor });
        // }}
      />
    </div>
  );
};

export default TailwindEditor;
