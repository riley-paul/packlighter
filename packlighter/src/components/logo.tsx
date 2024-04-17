import { getPaths } from "@/lib/utils";
import { Feather } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Logo(): ReturnType<React.FC> {
  return (
    <Link to={getPaths.home()} className="flex gap-2 items-center px-2">
      <Feather size="1.5rem" className="text-primary" />
      <span className="text-md">PackLighter</span>
    </Link>
  );
}
