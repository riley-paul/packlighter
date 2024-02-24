import LoginForm from "@/components/forms/login-form";
import {
  Card,
  Tab,
  TabList,
  Text,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import { Feather } from "lucide-react";
import React from "react";

const useStyles = makeStyles({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    rowGap: "2rem",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding(tokens.spacingVerticalL),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },
  cardContainer: {
    maxWidth: "350px",
    width: "100%",
  },
  copyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10vh",
    rowGap: tokens.spacingVerticalXS,
  },
  title: {
    fontSize: tokens.fontSizeBase600,
  },
  tablist: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "100%",
  },
});

enum AuthTab {
  Login = "login",
  SignUp = "sign-up",
}

export default function AuthPage(): ReturnType<React.FC> {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = React.useState<AuthTab>(AuthTab.Login);
  return (
    <div className={styles.container}>
      <div className={styles.copyContainer}>
        <Feather
          style={{
            height: "5rem",
            width: "5rem",
            color: tokens.colorBrandForeground1,
          }}
        />
        <Text size={800} weight="bold">
          PackLighter
        </Text>
        <Text size={200}>The packing tool of champions</Text>
      </div>
      <div className={styles.cardContainer}>
        <TabList
          className={styles.tablist}
          selectedValue={selectedTab}
          onTabSelect={(_, { value }) => setSelectedTab(value as AuthTab)}
        >
          <Tab value="login">Login</Tab>
          <Tab value="sign-up">Sign Up</Tab>
        </TabList>
        <Card className={styles.card}>
          {selectedTab === AuthTab.Login && <LoginForm />}
        </Card>
      </div>
    </div>
  );
}
