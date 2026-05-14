import {useState, useMemo, useEffect} from "react";
import {fetchConveniosList} from "./api/fetchConvenios";
import {mapLambdaItemsToConvenios} from "./lib/mapLambdaConvenio";
import SearchBar from "./components/SearchBar";
import ResultsHeader from "./components/ResultsHeader";
import ConvenioGrid from "./components/ConvenioGrid";
import Pagination from "./components/Pagination";
import "./index.css";

function getCanaryCookie() {
  const match = document.cookie.split("; ").find(row => row.startsWith("x-canary="));
  return match ? match.split("=")[1] : null;
}

function setCanaryCookie(value) {
  document.cookie = `x-canary=${value}; path=/; max-age=86400; SameSite=Lax`;
}

function CanaryToggle() {
  const [cookieValue, setCookieValue] = useState(getCanaryCookie);

  useEffect(() => {
    function onFocus() {
      setCookieValue(getCanaryCookie());
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const isOn = cookieValue === "true";

  function handleToggle() {
    const next = isOn ? "false" : "true";
    setCanaryCookie(next);
    setCookieValue(next);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white border border-gray-200 shadow-lg rounded-full px-3 py-2 select-none">
      <span className="text-xs font-semibold text-gray-600">Canary</span>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-500 cursor-pointer ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className={`text-xs font-mono font-bold ${isOn ? "text-green-600" : "text-gray-400"}`}>
        {isOn ? "true" : cookieValue === "false" ? "false" : "off"}
      </span>
    </div>
  );
}

const CONVENIOS_API_URL = import.meta.env.VITE_CONVENIOS_API_URL?.trim() ?? "";
const HAS_API_URL = Boolean(CONVENIOS_API_URL);

export default function App() {
  const [inputQuery, setInputQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [departamento, setDepartamento] = useState("");

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [convenios, setConvenios] = useState([]);
  const [loadError, setLoadError] = useState(() =>
    HAS_API_URL ? null : "Configura VITE_CONVENIOS_API_URL en el archivo .env (consulta .env.example).",
  );
  const [loading, setLoading] = useState(HAS_API_URL);
  const [fetchNonce, setFetchNonce] = useState(0);

  useEffect(() => {
    if (!HAS_API_URL) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const raw = await fetchConveniosList(CONVENIOS_API_URL);
        if (!cancelled) setConvenios(mapLambdaItemsToConvenios(raw));
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Error al cargar convenios.");
          setConvenios([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchNonce]);

  function handleSearch() {
    setActiveQuery(inputQuery.trim());
    setCurrentPage(1);
  }

  function handlePageSizeChange(size) {
    setPageSize(size);
    setCurrentPage(1);
  }

  function handleRetry() {
    setFetchNonce(n => n + 1);
  }

  const filtered = useMemo(() => {
    if (!activeQuery) return convenios;
    const q = activeQuery.toLowerCase();
    return convenios.filter(c => {
      const inNombre = c.nombre.toLowerCase().includes(q);
      const inBanco = c.banco.toLowerCase().includes(q);
      const inCiudad = c.ciudad != null && String(c.ciudad).toLowerCase().includes(q);
      return inNombre || inBanco || inCiudad;
    });
  }, [activeQuery, convenios]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md select-none">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-700 animate-pulse"></span>
        Canary
        <span className="text-amber-700 font-normal">v19.3.0</span>
      </div>
      <CanaryToggle />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <SearchBar
          query={inputQuery}
          onQueryChange={setInputQuery}
          departamento={departamento}
          onDepartamentoChange={setDepartamento}
          onSearch={handleSearch}
        />

        {HAS_API_URL && loading && (
          <p className="text-sm text-gray-500 mb-3" role="status">
            Cargando convenios desde la API…
          </p>
        )}

        {loadError && !loading && (
          <div
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            role="alert"
          >
            <span>{HAS_API_URL ? `No se pudo obtener el listado: ${loadError}` : loadError}</span>
            {HAS_API_URL ? (
              <button
                type="button"
                onClick={handleRetry}
                className="shrink-0 px-3 py-1.5 rounded-md bg-red-700 hover:bg-red-800 text-white text-xs font-medium cursor-pointer"
              >
                Reintentar
              </button>
            ) : null}
          </div>
        )}

        <ResultsHeader
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalVisible={paginated.length}
          totalAll={filtered.length}
        />

        <ConvenioGrid convenios={paginated} />

        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
