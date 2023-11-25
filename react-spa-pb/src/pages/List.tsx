import type { RecordModel } from "pocketbase";
import React from "react";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useLists } from "@/hooks/useLists";
import { Skeleton } from "@/components/ui/skeleton";
import { ListHeader } from "@/components/ListHeader";

export const Component: React.FC = () => {
  const { listId = "" } = useParams();

  return <ListHeader listId={listId} />;
};
