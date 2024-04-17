import SideBar from "@/components/side-bar";
import type React from "react";

type Props = React.PropsWithChildren;

const Root: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <main className="flex h-[100svh] overflow-hidden">
      <div className="flex w-full">
        <SideBar />
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default Root;
