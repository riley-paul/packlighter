import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ChangeEmailDialog(): ReturnType<React.FC> {
  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>This is irreversible</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="email" placeholder="New Email" />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" variant="secondary">
            Update Email
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
