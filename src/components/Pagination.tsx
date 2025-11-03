interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const FIRST_PAGE = 1;

  const pages = Array.from({ length: totalPages }, (_, i) => i + FIRST_PAGE);

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-2 mt-8">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition 
          ${page === 1 
            ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400" 
            : "hover:bg-orange-100 border-gray-300 text-gray-700"}`}
      >
        Anterior
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition 
            ${num === page
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"}`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition 
          ${page === totalPages 
            ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-400" 
            : "hover:bg-orange-100 border-gray-300 text-gray-700"}`}
      >
        Siguiente 
      </button>
    </div>
  );
};

export default Pagination;
