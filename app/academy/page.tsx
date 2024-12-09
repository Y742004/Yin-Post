import { auth } from "@/auth";
import { CreatePostForm } from "../ui/components/post/create-post-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session) return redirect("/");

  return (
    <>
      <CreatePostForm />
    </>
  );
}
