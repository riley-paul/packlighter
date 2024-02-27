import { updateCategory } from "@/api/category";
import { ExpandedCategory } from "@/api/list";
import { queryClient } from "@/lib/query";
import { Collections } from "@/lib/types";
import { Input, makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

interface Props {
  category: ExpandedCategory;
}

const useStyles = makeStyles({
  input: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export default function ListCategoryName(
  props: Props
): ReturnType<React.FC<Props>> {
  const { category } = props;

  const styles = useStyles();
  const { listId } = useParams();
  const updateNameMutation = useMutation({
    mutationFn: (name: string) =>
      updateCategory({ id: category.id, category: { name } }),
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.Lists, listId]);
    },
  });

  return (
    <Input
      className={styles.input}
      defaultValue={category.name}
      onBlur={(ev) => updateNameMutation.mutate(ev.target.value)}
      appearance="filled-lighter"
    />
  );
}
