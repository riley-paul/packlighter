import { getProfilePhoto } from "@/api/auth";
import { Feather, Menu } from "lucide-react";
import React from "react";

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
