import { auth } from "@/auth";
import { SignIn } from "../components/signin-signout-form/sign-in";
import { Sign } from "crypto";
import { SignOut } from "../components/signin-signout-form/sign-out";

export default async function  LoomLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session?.user) {
      return <>
       <h1>Unauthenticated</h1>
       <SignIn/>
        
      
      </>

    }
  return <>{children}</>;
}
