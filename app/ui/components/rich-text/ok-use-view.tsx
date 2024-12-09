"use client";

import { Editor } from "novel";
// import { defaultExtensions } from "novel/extensions";
import { useState } from "react";

const TailwindEditorView = ({
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

  if (!content) {
    return (
      <div className="relative w-full max-w-screen-lg mx-auto">
        <div className="text-center">MM Content Empty</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-screen-lg mx-auto">
      {/* {JSON.stringify(content)} */}
      <Editor
        className="bg-transparent h-auto"
        completionApi="https://api.novel.ai/completion"
        storageKey="editor"
        editorProps={{
          attributes: {
            class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl",
          },
          editable: () => false,
        }}
        defaultValue={content}
        disableLocalStorage={true}
        onUpdate={(editor) => {
          console.log({ editor });
        }}
      />
    </div>
  );
};

export default TailwindEditorView;
