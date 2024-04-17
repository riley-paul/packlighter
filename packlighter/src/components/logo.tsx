import { getPaths } from "@/lib/utils";
import { Feather } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo(): ReturnType<React.FC> {
  return (
    <Link href={getPaths.home()} className="flex items-center gap-2 px-2">
      <Feather size="1.5rem" className="text-primary" />
      <span className="text-md">PackLighter</span>
    </Link>
  );
}
