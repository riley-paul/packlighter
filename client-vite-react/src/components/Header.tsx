import { Feather } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => (
  <header className="h-14 bg-card border-b shadow flex items-center px-6 py-4 sticky top-0">
    <Link to="/" className="flex gap-3 items-center">
      <Feather className="h-6 w-6 text-teal-500" />
      <h1 className="font-medium text-lg">PackLighter</h1>
    </Link>
  </header>
);
