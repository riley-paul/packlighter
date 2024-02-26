import { getProfilePhoto } from "@/api/auth";
import {
  makeStyles,
  tokens,
  shorthands,
  Text,
  ToggleButton,
  Persona,
} from "@fluentui/react-components";
import { Feather, Menu } from "lucide-react";
import React from "react";

const useStyles = makeStyles({
  header: {
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomColor: tokens.colorNeutralStroke1,
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: "solid",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    zIndex: 50,
  },
  headerContainer: {
    ...shorthands.padding(tokens.spacingHorizontalM, tokens.spacingVerticalXL),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  groupContainer: {
    display: "flex",
    alignItems: "center",
  },
  toggleButton: {
    height: "100%",
    width: "3rem",
    maxWidth: "unset",
  },
});

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export default function AppBar(props: Props): ReturnType<React.FC<Props>> {
  const styles = useStyles();
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const imageUrl = getProfilePhoto();

  return (
    <header className={styles.header}>
      <ToggleButton
        className={styles.toggleButton}
        shape="square"
        icon={<Menu size="1rem" />}
        appearance="subtle"
        size="large"
        checked={isDrawerOpen}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      />
      <div className={styles.headerContainer}>
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
        <Persona avatar={{ image: { src: imageUrl } }} />
      </div>
    </header>
  );
}
