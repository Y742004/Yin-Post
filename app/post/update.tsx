"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export function UpdatePost({
  id,
   oldContent
}: {
  id: string;
  oldContent: string;
}) {
  const [content, setContent] = useState(oldContent);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: {
      id: string;
      content: string;
    }) => {
      return fetch("/api/post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postData"] });
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ id, content});
  };

  return (
    <>
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button className="bg-blue-500">Edit</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form onSubmit={onSubmit}>
            <div className="px-1 py-2">
             
              <Input
                variant="bordered"
                isRequired
                label="Content"
                labelPlacement="outside"
                value={content}
                placeholder="Content"
                type="text"
                onChange={(e) => setContent(e.target.value)}
              />
              <Button className="bg-blue-500 " type="submit">Done</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
