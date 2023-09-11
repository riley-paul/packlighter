import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faSpinner} className="h-5 animate-spin mr-3" />
        <span className="text-xl text-muted-foreground">Loading</span>
      </div>
    </div>
  );
};

export default Loading;
