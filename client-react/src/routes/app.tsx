import AppBar from "@/components/app-bar";
import PackingLists from "@/components/packing-lists";
import useDrawerType from "@/hooks/useDrawerType";
import {
  Drawer,
  DrawerBody,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import React from "react";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  container: { display: "flex", flexDirection: "column", height: "100%" },
  bodyContainer: { display: "flex", flexGrow: 1 },
  drawer: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRightColor: tokens.colorNeutralStroke1,
    borderRightWidth: tokens.strokeWidthThin,
    borderRightStyle: "solid",
    ...shorthands.padding(0),
  },
  drawerBody: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding("1rem"),
  },
});

export default function App(): ReturnType<React.FC> {
  const styles = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const drawerType = useDrawerType();

  return (
    <div className={styles.container}>
      <AppBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <div className={styles.bodyContainer}>
        <Drawer
          open={isDrawerOpen}
          onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
          type={drawerType}
          className={styles.drawer}
        >
          <DrawerBody className={styles.drawerBody}>
            <PackingLists />
          </DrawerBody>
        </Drawer>
        <Outlet />
      </div>
    </div>
  );
}
