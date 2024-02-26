import AppBar from "@/components/app-bar";
import useDrawerType from "@/hooks/useDrawerType";
import {
  Drawer,
  DrawerBody,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import React from "react";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  container: { display: "flex", flexDirection: "column", height: "100%" },
  bodyContainer: { display: "flex", flexGrow: 1 },
  drawer: {
    borderRightColor: tokens.colorNeutralStroke1,
    borderRightWidth: tokens.strokeWidthThin,
    borderRightStyle: "solid",
  },
});

export default function App(): ReturnType<React.FC> {
  const styles = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const drawerType = useDrawerType();

  return (
    <div className={styles.container}>
      <AppBar />
      <div className={styles.bodyContainer}>
        <Drawer
          open={isDrawerOpen}
          onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
          type={drawerType}
          className={styles.drawer}
        >
          <DrawerBody>hello</DrawerBody>
        </Drawer>
        <Outlet />
      </div>
    </div>
  );
}
