export function Pagination({ page, onPageChange, hasNextPage }: { page: number, onPageChange: (page: number) => void, hasNextPage: boolean }) {
    return (
        <div className="pagination flex justify-center items-center gap-2 mt-4 ">
            <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <span>{page}</span>
            <button onClick={() => onPageChange(page + 1)} disabled={!hasNextPage}>
                Next
            </button>
        </div>
    );
}
