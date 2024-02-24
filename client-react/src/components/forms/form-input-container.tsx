import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import React from "react";

type Props = React.PropsWithChildren<{
  horizontal?: boolean;
}>;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
    columnGap: tokens.spacingHorizontalS,
  },
  horizontal: {
    display: "grid",
  },
});

export default function FormInputContainer(
  props: Props
): ReturnType<React.FC<Props>> {
  const { children, horizontal } = props;
  const styles = useStyles();
  const numChildren = React.Children.count(children);

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${numChildren}, 1fr)` }}
      className={mergeClasses(
        styles.container,
        horizontal && styles.horizontal
      )}
    >
      {children}
    </div>
  );
}
