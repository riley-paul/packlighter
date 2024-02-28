import React from "react";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

interface Props {
  handleDelete: () => void;
  noConfirm?: boolean;
}

const DeleteButton: React.FC<Props> = (props) => {
  const { handleDelete, noConfirm } = props;

  const [isConfirming, setIsConfirming] = React.useState(false);
  const cancelDelete = () => setIsConfirming(false);

  React.useEffect(() => {
    if (!isConfirming) return;

    window.addEventListener("click", cancelDelete);
    return () => window.removeEventListener("click", cancelDelete);
  }, [isConfirming]);

  return (
    <Button
      size="icon"
      variant={isConfirming ? "destructive" : "ghostMuted"}
      className="h-6 w-6 rounded-full"
      onClick={(ev) => {
        ev.stopPropagation();
        if (noConfirm) {
          handleDelete();
          return;
        }

        if (isConfirming) {
          handleDelete();
          setIsConfirming(false);
          return;
        }

        setIsConfirming(true);
      }}
    >
      {isConfirming ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
    </Button>
  );
};

export default DeleteButton;
