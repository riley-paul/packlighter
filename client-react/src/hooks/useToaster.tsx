import { TOASTER_ID } from "@/lib/constants";
import {
  Toast,
  ToastBody,
  ToastIntent,
  ToastTitle,
  useToastController,
} from "@fluentui/react-components";

type MakeToastProps = { message: string; body?: string; intent: ToastIntent };

export default function useToaster() {
  const { dispatchToast } = useToastController(TOASTER_ID);

  const makeToast = (props: MakeToastProps) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{props.message}</ToastTitle>
        {props.body && <ToastBody>{props.body}</ToastBody>}
      </Toast>,
      { intent: props.intent }
    );
  };

  return { makeToast };
}
