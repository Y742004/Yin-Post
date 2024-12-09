import { auth } from "@/auth";
import { Sidebar } from "../ui/components/sidebar/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full p-4">{children}</div>
    </main>
  );
}
