import PocketBase from "pocketbase";
import Cookies from "js-cookie";

interface Result {
  pb: PocketBase;
  user?: PocketBase["authStore"]["model"];
}

export default function usePocketbase() {
  const result: Result = { pb: new PocketBase(process.env.PB_URL) };

  const authCookie = Cookies.get("pb_auth");
  result.pb.authStore.loadFromCookie(authCookie);


  return result;
}
