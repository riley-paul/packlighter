import type { RecordModel } from "pocketbase";

interface Props {
  initialCategories: RecordModel[];
}

export const ListBody: React.FC<Props> = (props) => {
  console.log(props);
  const { initialCategories } = props;
  return (
    <div>
      {initialCategories.map((c) => (
        <div key={c.id}>
          <div>{c.name}</div>
          <ul>
            {c.items.map((i: RecordModel) => (
              <li>{i.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
