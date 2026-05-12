import { useState } from 'react';
import BankLogo from './BankLogo';

export default function ConvenioCard({ convenio }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={[
        'relative flex flex-col items-center justify-between',
        'border rounded-xl p-4 bg-white cursor-pointer select-none',
        'transition-all duration-200',
        'min-h-[160px]',
        hovered
          ? 'border-blue-400 shadow-md shadow-blue-100'
          : 'border-gray-200 shadow-sm hover:shadow',
      ].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo area */}
      <div className="flex-1 flex items-center justify-center w-full pt-2 pb-1">
        <BankLogo
          banco={convenio.banco}
          iniciales={convenio.iniciales}
          bgColor={convenio.bgColor}
          textColor={convenio.textColor}
          faded={hovered}
        />
      </div>

      {/* Action buttons — only visible on hover */}
      {hovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
          <button
            className="px-6 py-1.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); }}
          >
            Pagar
          </button>
          <button
            className="px-6 py-1.5 bg-sky-300 hover:bg-sky-400 text-gray-800 text-sm font-medium rounded-full transition-colors cursor-pointer"
            onClick={(e) => { e.stopPropagation(); }}
          >
            Inscribir
          </button>
        </div>
      )}

      {/* Convenio name */}
      <p
        className={[
          'text-xs font-semibold text-center leading-tight mt-2 w-full',
          hovered ? 'text-gray-400' : 'text-gray-800',
          'transition-colors duration-200',
        ].join(' ')}
      >
        {convenio.nombre}
      </p>
    </div>
  );
}
