import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Pagination({
  page,
  onPageChange,
  hasNextPage,
}: {
  page: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}) {
  return (
    <div className="pagination flex justify-center items-center gap-2 mt-4 ">
      <button onClick={() => onPageChange(1)} disabled={page === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span>{page}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={!hasNextPage}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
