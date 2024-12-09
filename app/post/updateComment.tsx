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

export function UpdateComment({
  id,
   oldText
}: {
  id: string;
  oldText: string;
}) {
  const [text, setText] = useState(oldText);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: {
      id: string;
      text: string;
    }) => {
      return fetch("/api/postcomment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postcommentData"] });
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ id, text});
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
                label="Text"
                labelPlacement="outside"
                value={text}
                placeholder="Text"
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
              <Button className="bg-blue-500 " type="submit">Done</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
