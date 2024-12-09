 "use client";

import { Avatar, Button, Input } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
 import Link from "next/link";
 import { CurrentUser } from "./components/user/current-user";
import { DeletePost } from "./post/delete";
import { UpdatePost } from "./post/update";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
  
export default function Page() {
const session = useSession();
  


  const { isPending, error, data } = useQuery({
    queryKey: ["postData"],
    queryFn: () => fetch("/api/post").then((res) => res.json()),
  });

  const { data: data2 } = useQuery({
    queryKey: ["currentUserData"],
    queryFn: () => fetch("/api/currentuser").then((res) => res.json()),
  });

  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: { content: string, userId: string }) => {
      return fetch("/api/post", {
        method: "POST",
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
    mutation.mutate({ content, userId: data2?.id });
  };

  if (isPending) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (session.status === "unauthenticated") {
    return (
      <div className="">
        <h1>PLEASE LOGIN</h1>
        <Button onClick={() => signIn()}>Acc win mal kwar</Button>
        <Button onClick={() => signOut()}>Acc win htwat kwar</Button>

      </div>
    );
  }
  return (
    <> 
   <div className="bg-white dark:bg-black"> <ThemeSwitcher/>
    <CurrentUser/>
    {/* <Button onClick={() => SignIN()} >Acc win ml kwar</Button> */}

      <div className="p-10 ">
        <form onSubmit={onSubmit}>
          <div className="border p-5 grid gap-3">
            <div className="">
              <Input  
              variant="bordered"
                isRequired
                value={content}
                placeholder="What is on your mind?"
                type="text"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="">
              <Button type="submit" size="lg" fullWidth color="primary">
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="grid gap-5 p-3 text-black dark:text-white">
        {data.map((post: any) => (
        <div className="">  <Link href={`/post/${post.id}`}>
          <div className="border rounded-xl p-5 ">
          <div className="flex gap-2 items-center">
            <Avatar />
            <div className="">
              <p className="font-bold text-md">{post.user?.email}  </p>
              <p className="text-gray-500 text-sm"> 8 hours ago</p>
            </div>
          </div>
          <div className="mt-5 ">{post.content}</div>
        
          {/* <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(post, null, 2)}</code>
        </pre> */}
  
          {/* <LoveReaction type="Love" youtubeId="" userId={data2?.id} />
  */}
        {/* <CommentBoxPost contentId={post.id} /> */}
        </div>
        </Link> <div className="flex gap-3 mt-5">
         <DeletePost id={post.id}/>
         <UpdatePost id={post.id} oldContent={post.content} /></div> </div>
        ))}
      </div>
      </div>
     
    </>
  );
}
