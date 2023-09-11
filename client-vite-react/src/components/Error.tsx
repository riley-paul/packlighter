import { useRouteError } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as ResponseInit;
  console.error(error);

  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="prose dark:prose-invert">
        <h1>{error.status}</h1>
        <h1>
          <FontAwesomeIcon icon={faBug} className="mr-4 text-red-500" />
          Error
        </h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText}</i>
        </p>
      </div>
    </main>
  );
};
