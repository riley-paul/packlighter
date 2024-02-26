import { createList, deleteList, getLists } from "@/api/list";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import {
  makeStyles,
  tokens,
  shorthands,
  TabList,
  Tab,
  Text,
  Button,
  mergeClasses,
  Spinner,
} from "@fluentui/react-components";
import { Delete, Plus } from "lucide-react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,

    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    ...shorthands.borderStyle("solid"),

    paddingBottom: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalS,
    maxHeight: "30vh",
    overflowY: "auto",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalS,
  },
  tabContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: tokens.spacingHorizontalS,

    "& .delete-list-button": {
      display: "none",
    },

    "&:hover": {
      "& .delete-list-button": {
        display: "inline-flex",
      },
    },
  },
  tabUnnamed: {
    fontStyle: "italic",
    color: tokens.colorNeutralForeground3,
  },
});

export default function PackingLists(): ReturnType<React.FC> {
  const { listId } = useParams();
  const navigate = useNavigate();

  const listsQuery = useQuery({
    queryKey: [Collections.Lists],
    queryFn: getLists,
  });

  const newListMutation = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      queryClient.invalidateQueries(Collections.Lists);
      navigate(`/list/${data.id}`);
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(Collections.Lists);
      if (variables === listId) {
        navigate("/");
      }
    },
  });

  const styles = useStyles();

  if (listsQuery.isLoading) return <div>Loading...</div>;

  if (listsQuery.isError) return <div>Error</div>;

  return (
    <div>
      <header className={styles.headerContainer}>
        <Text weight="semibold">Packing Lists</Text>
        <Button
          icon={
            newListMutation.isLoading ? (
              <Spinner size="extra-tiny" />
            ) : (
              <Plus size="1rem" />
            )
          }
          size="small"
          appearance="subtle"
          onClick={() => newListMutation.mutate()}
        >
          New List
        </Button>
      </header>
      <div className={styles.container}>
        <TabList
          vertical
          selectedValue={listId}
          onTabSelect={(_, { value }) => navigate(`/list/${value}`)}
        >
          {listsQuery.data?.map((list) => (
            <div className={styles.tabContainer}>
              <Tab
                key={list.id}
                value={list.id}
                className={mergeClasses(!list.name && styles.tabUnnamed)}
              >
                {list.name || "Unnamed List"}
              </Tab>
              <Button
                className="delete-list-button"
                appearance="subtle"
                shape="circular"
                icon={<Delete size="1rem" />}
                size="small"
                onClick={() => deleteListMutation.mutate(list.id)}
              />
            </div>
          ))}
        </TabList>
      </div>
    </div>
  );
}
