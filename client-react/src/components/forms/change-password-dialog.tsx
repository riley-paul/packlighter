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

export default function ChangePasswordDialog(): ReturnType<React.FC> {
  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>This is irreversible</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input type="password" placeholder="Current Password" />
          <Input type="password" placeholder="New Password" />
          <Input type="password" placeholder="Confirm New Password" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="secondary">
            Change Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
