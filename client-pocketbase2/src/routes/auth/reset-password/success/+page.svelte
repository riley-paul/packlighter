<script lang="ts">
  import { Button } from "$components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
  } from "$components/ui/card";
</script>

<Card>
  <CardHeader>
    <CardTitle>Password Reset Email Sent</CardTitle>
    <CardDescription>
      Check your email account for a link to reset your password. If it doesn’t
      appear within a few minutes, check your spam folder.
    </CardDescription>
  </CardHeader>
  <CardFooter class="grid space-y-1">
    <Button href="/auth/sign-in">Sign In</Button>
  </CardFooter>
</Card>
