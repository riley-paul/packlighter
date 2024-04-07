import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function Home() {
  const { userId } = auth();

  return <main className="">{userId}</main>;
}
