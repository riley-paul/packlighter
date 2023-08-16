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

  import { APP_NAME } from "$lib/config/constants";
</script>

<Card>
  <CardHeader>
    <CardTitle>Confirm Your Email Address</CardTitle>
    <CardDescription>
      Please check your email account for a message to confirm your email
      address for {APP_NAME}.
    </CardDescription>
  </CardHeader>
  <CardFooter class="grid">
    <form class="grid" action="" method="POST">
      <Button type="submit">Resend Email</Button>
    </form>
  </CardFooter>
</Card>
