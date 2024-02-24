import AppBar from "@/components/app-bar";
import { makeStyles } from "@fluentui/react-components";
import React from "react";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  container: {},
});

export default function App(): ReturnType<React.FC> {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <AppBar />
      <Outlet />
    </div>
  );
}
