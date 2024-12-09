"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
// Create a client
const queryClient = new QueryClient();

export default function RootProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<SessionProvider>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider></SessionProvider>
  );
}
