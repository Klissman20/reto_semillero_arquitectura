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
    <div className="min-h-screen bg-white">
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
