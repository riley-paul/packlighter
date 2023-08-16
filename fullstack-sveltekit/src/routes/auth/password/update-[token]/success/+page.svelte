<script lang="ts">
  import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
</script>

<Card>
  <CardHeader>
    <CardTitle>Password Updated</CardTitle>
    <CardDescription>
      Your password has been updated. You may now <a href="/auth/sign-in"
        >sign in</a
      > with your new password.
    </CardDescription>
  </CardHeader>
</Card>
