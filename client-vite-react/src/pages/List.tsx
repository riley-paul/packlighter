import { useParams } from "react-router-dom";

export const Component: React.FC = () => {
  const { listId } = useParams();
  return <div>{listId}</div>;
};
