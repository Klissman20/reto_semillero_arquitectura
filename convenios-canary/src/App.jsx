import { useState, useMemo } from 'react';
import { CONVENIOS } from './data/convenios';
import SearchBar from './components/SearchBar';
import ResultsHeader from './components/ResultsHeader';
import ConvenioGrid from './components/ConvenioGrid';
import Pagination from './components/Pagination';
import './index.css';

export default function App() {
  // Filter state — inputQuery is live typed value; activeQuery is what was searched
  const [inputQuery, setInputQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [departamento, setDepartamento] = useState('');

  // Pagination state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  function handleSearch() {
    setActiveQuery(inputQuery.trim());
    setCurrentPage(1);
  }

  function handlePageSizeChange(size) {
    setPageSize(size);
    setCurrentPage(1);
  }

  // Filtered dataset — only recalculates when activeQuery changes
  const filtered = useMemo(() => {
    if (!activeQuery) return CONVENIOS;
    const q = activeQuery.toLowerCase();
    return CONVENIOS.filter(
      (c) =>
        c.nombre.toLowerCase().includes(q) ||
        c.banco.toLowerCase().includes(q)
    );
  }, [activeQuery]);

  // Paginated slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Canary badge — fixed to top-right corner */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md select-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-700 animate-pulse"></span>
        Canary
        <span className="text-amber-700 font-normal">v19.3.0</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <SearchBar
          query={inputQuery}
          onQueryChange={setInputQuery}
          departamento={departamento}
          onDepartamentoChange={setDepartamento}
          onSearch={handleSearch}
        />

        <ResultsHeader
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalVisible={paginated.length}
          totalAll={filtered.length}
        />

        <ConvenioGrid convenios={paginated} />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
