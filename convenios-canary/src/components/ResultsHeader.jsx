const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function ResultsHeader({ pageSize, onPageSizeChange, totalVisible, totalAll }) {
  return (
    <div className="flex items-center justify-between mb-5">
      {/* Mostrar N dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">Mostrar</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none border border-gray-300 rounded-md pl-3 pr-7 py-1.5 text-sm text-gray-700 bg-white outline-none cursor-pointer focus:border-blue-400"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Result count */}
      <span className="text-sm font-medium" style={{ color: '#E07B3A' }}>
        {totalVisible} de {totalAll} resultados
      </span>
    </div>
  );
}
