import { ExpandedCategory, useDataQuery } from "@/hooks/useDataQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

interface Props {
  listId: string;
  category: ExpandedCategory;
}

const schema = z.object({
  name: z.string(),
});

export const Category: React.FC<Props> = (props) => {
  const { listId, category } = props;
  const { updateCategory } = useDataQuery(listId);

  const methods = useForm({
    resolver: zodResolver(schema),
    values: category,
  });

  const { handleSubmit, control } = methods;

  const saveCategory = (data: ExpandedCategory) => {
    updateCategory.mutate({ id: category.id, data });
  };

  return (
    <div>
      <form
        onBlur={handleSubmit(saveCategory)}
        onSubmit={handleSubmit(saveCategory)}
      >
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Unnamed Category"
              className="font-bold text-teal-400 text-lg"
            />
          )}
        />
        <input type="hidden" />
      </form>
    </div>
  );
};
