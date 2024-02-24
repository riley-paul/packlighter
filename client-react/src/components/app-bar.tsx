import {
  makeStyles,
  tokens,
  shorthands,
  Text,
} from "@fluentui/react-components";
import { Feather } from "lucide-react";
import React from "react";

const useStyles = makeStyles({
  header: {
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottomColor: tokens.colorNeutralStroke1,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: "solid",
    ...shorthands.padding(tokens.spacingHorizontalM, tokens.spacingVerticalXL),
    height: "3rem",
    display: "flex",
    alignItems: "center",
  },
  groupContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default function AppBar(): ReturnType<React.FC> {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <div className={styles.groupContainer}>
        <Feather
          style={{
            color: tokens.colorBrandForeground1,
            marginRight: tokens.spacingHorizontalS,
          }}
        />
        <Text size={400} weight="semibold">
          PackLighter
        </Text>
      </div>
    </header>
  );
}
