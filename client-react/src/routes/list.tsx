import { getList } from "@/api/list";
import ListCategory from "@/components/list-category";
import { Collections } from "@/lib/types";
import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  categoryContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
    overflowY: "auto",
  },
});

export default function ListPage(): ReturnType<React.FC> {
  const { listId = "" } = useParams();
  const styles = useStyles();

  const listQuery = useQuery({
    queryKey: [Collections.Lists, listId],
    queryFn: ({ queryKey }) => getList(queryKey[1]),
  });

  if (listQuery.isLoading) return <div>Loading...</div>;

  if (listQuery.isError || !listQuery.data) return <div>Error</div>;

  return (
    <div>
      <div>{listQuery.data.name}</div>
      <div>{listQuery.data.description}</div>
      <div className={styles.categoryContainer}>
        {listQuery.data.categories.map((category) => (
          <ListCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
