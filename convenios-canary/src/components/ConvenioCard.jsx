import { useState } from 'react';
import BankLogo from './BankLogo';

export default function ConvenioCard({ convenio }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const heroImage = Boolean(convenio.imagen) && !imgFailed;
  const subtitulo = convenio.ciudad?.trim() || convenio.banco;

  return (
    <div
      className={[
        'relative flex flex-col cursor-pointer select-none',
        'border rounded-xl bg-white transition-all duration-200 overflow-hidden',
        heroImage ? 'p-0' : 'items-center justify-between p-4 min-h-[160px]',
        hovered ? 'border-blue-400 shadow-md shadow-blue-100' : 'border-gray-200 shadow-sm hover:shadow',
      ].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {heroImage ? (
        <>
          <div className="relative w-full aspect-[4/3] max-h-48 shrink-0 bg-gray-100">
            <img
              src={convenio.imagen}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
              style={{ opacity: hovered ? 0.85 : 1 }}
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
            />
            {hovered && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 bg-black/25">
                <button
                  type="button"
                  className="px-6 py-1.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-full transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Pagar
                </button>
                <button
                  type="button"
                  className="px-6 py-1.5 bg-sky-300 hover:bg-sky-400 text-gray-800 text-sm font-medium rounded-full transition-colors cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Inscribir
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1.5 p-4 w-full text-left">
            <p
              className={[
                'text-sm font-bold text-gray-900 leading-snug',
                hovered ? 'text-gray-500' : '',
                'transition-colors duration-200',
              ].join(' ')}
            >
              {convenio.nombre}
            </p>
            {subtitulo ? (
              <p className="text-xs text-gray-500">{subtitulo}</p>
            ) : null}
            {convenio.url ? (
              <a
                href={convenio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline mt-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                Ver beneficios
              </a>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex items-center justify-center w-full pt-2 pb-1">
            <BankLogo
              banco={convenio.banco}
              iniciales={convenio.iniciales}
              bgColor={convenio.bgColor}
              textColor={convenio.textColor}
              imagen={imgFailed ? undefined : convenio.imagen}
              faded={hovered}
            />
          </div>
          {hovered && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
              <button
                type="button"
                className="px-6 py-1.5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-full transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Pagar
              </button>
              <button
                type="button"
                className="px-6 py-1.5 bg-sky-300 hover:bg-sky-400 text-gray-800 text-sm font-medium rounded-full transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Inscribir
              </button>
            </div>
          )}
          <p
            className={[
              'text-xs font-semibold text-center leading-tight mt-2 w-full',
              hovered ? 'text-gray-400' : 'text-gray-800',
              'transition-colors duration-200',
            ].join(' ')}
          >
            {convenio.nombre}
          </p>
        </>
      )}
    </div>
  );
}
