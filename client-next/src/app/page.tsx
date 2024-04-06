"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="">
      <Button onClick={() => toast.success("Hello")}>Hello</Button>
    </main>
  );
}
