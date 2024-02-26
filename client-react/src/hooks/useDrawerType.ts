import { DrawerProps } from "@fluentui/react-components";
import React from "react";

type DrawerType = Required<DrawerProps>["type"];

export default function useDrawerType(): DrawerType {
  const [type, setType] = React.useState<DrawerType>("inline");

  React.useEffect(() => {
    const onMediaQueryChange = ({ matches }: MediaQueryListEvent) =>
      setType(matches ? "overlay" : "inline");

    const match = window.matchMedia("(max-width: 720px)");
    if (match.matches) setType("overlay");
    match.addEventListener("change", onMediaQueryChange);

    return () => match.removeEventListener("change", onMediaQueryChange);
  }, []);

  return type;
}
