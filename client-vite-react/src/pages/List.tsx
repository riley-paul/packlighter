import Loading from "@/components/Loading";
import { useNavigation, useParams } from "react-router-dom";

export const List: React.FC = () => {
  const { listId } = useParams();
  const navigation = useNavigation();

  return navigation.state === "loading" ? <Loading /> : <div>{listId}</div>;
};
