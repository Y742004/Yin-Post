"use client";
import { Avatar, Button, ButtonGroup, Input, Link } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CurrentUser } from "../components/user/current-user";
import { signIn, useSession } from "next-auth/react";
import { video } from "framer-motion/client";
import { on } from "events";
 import { SignIn } from "../components/signin-signout-form/sign-in";
import { DeleteComment } from "./deleteComment";
import { UpdateComment } from "./updateComment";

export default function CommentBoxPost({contentId}: {contentId: string}) {

 
const {isPending, error, data} = useQuery({
  queryKey: ["postcommentData", contentId],
  queryFn: () => fetch(`/api/postcomment/current?postId=${contentId}`).then((res) => res.json()),
})

const {data: data2 } = useQuery({
  queryKey: ["currentUserData"],
  queryFn: () => fetch(`/api/currentuser`).then((res) => res.json()),
})



  const [text, setText] = useState("");
const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: {
      text: string;
      postId: string;
      userId: string;
    }) => {
      return fetch("/api/postcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postcommentData"] });}
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({text, postId:contentId, userId: data2?.id });
  }

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
    {/* <CurrentUser/> */}
    {/* <SignIn/> */}
    <div className="bg-white dark:bg-black text-black dark:text-white  ">
    <form className="mt-5" onSubmit={onSubmit}>
    <div className="flex gap-3 items-center">
        <Input
          label="Comment"
          placeholder="Type your comment"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button color="primary" type="submit">Send</Button>
      </div>
    </form>

    <div className="">
      {data.map((postcomment: any) => (
        <div className="">
          <div className="flex gap-5 mt-10 ">
          <div className="">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </div>
          <div className="">
            <p className="text-sm font-semibold">
              
              {postcomment.user.email}
              <span className="text-gray-500 font-normal">1 days ago</span>{" "}
            </p>
            <p className=" text-sm mt-2">
            {postcomment.text}
            </p>
           <div className="flex gap-3 mt-5"><DeleteComment id={postcomment.id}/>
           <UpdateComment id={postcomment.id} oldText={postcomment.text}/></div> 
            <div className="">
              <ButtonGroup isIconOnly variant="light" size="sm">
                <Button>
                 </Button>
                <Button>
                 </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
          {/* <p>{postcomment.text}</p> */}
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(postcomment, null, 2)}</code>
        </pre>
        </div>
      ))}
    </div>
    </div>
   
     
    </>
  );
}
