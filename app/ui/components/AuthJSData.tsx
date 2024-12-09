import { auth } from "@/auth";

export default async function AuthJSData() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
}
