import React from "react";

interface Props {
  message: string;
}

const Placeholder: React.FC<Props> = (props) => {
  const { message } = props;

  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default Placeholder;
