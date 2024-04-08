import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import AppHeader from "@/components/app-header";
import PackingLists from "@/components/packing-lists";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PackLighter",
  description: "The packing list of champions",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AppHeader />
            <PackingLists />

            {children}
          </ThemeProvider>
        </body>
        <Toaster richColors />
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
