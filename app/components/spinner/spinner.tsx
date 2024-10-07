import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function Spinner() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-1 ">
      <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="2xl" />
      <p>získávám data...</p>
    </div>
  );
}
