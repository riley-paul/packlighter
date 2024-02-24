import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "grid",
    width: "100%",
    marginTop: tokens.spacingVerticalXL,
    columnGap: tokens.spacingHorizontalS,
  },
});

type Props = React.PropsWithChildren;

export default function FormActionContainer(
  props: Props
): ReturnType<React.FC<Props>> {
  const { children } = props;
  const styles = useStyles();
  const numChildren = React.Children.count(children);
  return (
    <div
      className={styles.container}
      style={{ gridTemplateColumns: `repeat(${numChildren}, 1fr)` }}
    >
      {children}
    </div>
  );
}
