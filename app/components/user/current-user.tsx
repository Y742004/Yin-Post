"use client";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { h1 } from "framer-motion/client";
import { signIn, signOut, useSession } from "next-auth/react";

export function CurrentUser() {
  const session = useSession();

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
      <Button onClick={() => signIn()}>Acc win mal kwar</Button>
      <Button onClick={() => signOut()}>Acc win htwat kwar</Button>
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  );
}
