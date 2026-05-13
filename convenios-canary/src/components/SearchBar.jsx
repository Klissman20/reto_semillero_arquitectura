import { DEPARTAMENTOS } from '../data/departamentos';

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-500 pointer-events-none"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function SearchBar({ query, onQueryChange, departamento, onDepartamentoChange, onSearch }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onSearch();
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
      {/* Search input */}
      <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-200 transition-all">
        <SearchIcon />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe el nombre o código del convenio"
          className="flex-1 ml-2 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>

      {/* Departamento dropdown */}
      <div className="relative min-w-[180px]">
        <label className="absolute -top-2.5 left-3 text-xs text-gray-500 bg-white px-1 leading-none z-10">
          Departamento
        </label>
        <div className="flex items-center border border-blue-400 rounded-lg px-3 py-2.5 bg-white">
          <select
            value={departamento}
            onChange={(e) => onDepartamentoChange(e.target.value)}
            className="flex-1 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer pr-2"
          >
            <option value="">Seleccionar</option>
            {DEPARTAMENTOS.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <ChevronDownIcon />
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={onSearch}
        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
      >
        Buscar
      </button>
    </div>
  );
}
