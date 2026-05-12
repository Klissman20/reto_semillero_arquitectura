function PageButton({ children, active, disabled, onClick }) {
  const base =
    'w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors cursor-pointer select-none';

  const styles = active
    ? `${base} bg-blue-900 text-white`
    : disabled
    ? `${base} text-gray-300 cursor-not-allowed`
    : `${base} border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600`;

  return (
    <button className={styles} onClick={!disabled ? onClick : undefined} disabled={disabled}>
      {children}
    </button>
  );
}

function ChevronLeft() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page numbers — always show first, last, current, and neighbours; collapse with ellipsis
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-2 mb-8">
      {/* Prev */}
      <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft />
      </PageButton>

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            &hellip;
          </span>
        ) : (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        )
      )}

      {/* Next */}
      <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight />
      </PageButton>
    </div>
  );
}
