import {
  Button,
  Card,
  Input,
  Tab,
  TabList,
  Text,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Feather, Key, User } from "lucide-react";
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
  },
  cardContainer: {
    maxWidth: "300px",
    width: "100%",
  },
  copyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10vh",
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
        <Text size={200}>The packing list tool of champions</Text>
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
          <Input
            contentBefore={
              <User
                style={{
                  height: tokens.fontSizeBase300,
                  width: tokens.fontSizeBase300,
                }}
              />
            }
            appearance="filled-lighter"
            placeholder="Username"
          />
          <Input
            contentBefore={
              <Key
                style={{
                  height: tokens.fontSizeBase300,
                  width: tokens.fontSizeBase300,
                }}
              />
            }
            type="password"
            appearance="filled-lighter"
            placeholder="Password"
          />
          <Button appearance="primary">Submit</Button>
        </Card>
      </div>
    </div>
  );
}
