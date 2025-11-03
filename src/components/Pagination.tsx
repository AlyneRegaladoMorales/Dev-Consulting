interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ page, totalPages, onPageChange, onNext, onPrev }: Props) => {
  const FIRST_PAGE = 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + FIRST_PAGE);

  return (
    <div className="flex justify-center items-center flex-wrap gap-3 my-8">
      <button
        onClick={onPrev}
        disabled={page === FIRST_PAGE}
        className="px-3 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ‹ Anterior
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-2 border rounded-md transition-colors ${
            num === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="px-3 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente ›
      </button>
    </div>
  );
};

export default Pagination;
