/** Paleta acorde al estilo fintech del buscador (fallback cuando no hay imagen). */
const PALETTE = [
  { bgColor: '#00873D', textColor: '#ffffff' },
  { bgColor: '#0057A8', textColor: '#ffffff' },
  { bgColor: '#D42B2B', textColor: '#ffffff' },
  { bgColor: '#E8000D', textColor: '#ffffff' },
  { bgColor: '#6B21A8', textColor: '#ffffff' },
  { bgColor: '#0D9488', textColor: '#ffffff' },
  { bgColor: '#B45309', textColor: '#ffffff' },
  { bgColor: '#1E3A8A', textColor: '#ffffff' },
];

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pickColors(seed) {
  return PALETTE[simpleHash(seed) % PALETTE.length];
}

function initialsFrom(nombre) {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nombre.trim().slice(0, 2).toUpperCase() || '??';
}

/**
 * Convierte ítems del GET /convenios de POC-Lambda-GetConvenios (canary)
 * al shape usado por ConvenioCard / BankLogo.
 * @see https://github.com/brajogiver2/POC-Lambda-GetConvenios/blob/canary/docs/04-backend-services.md
 */
export function mapLambdaItemsToConvenios(items) {
  return items.map((item, index) => {
    const seed = `${item.nombre}|${item.ciudad ?? ''}`;
    const { bgColor, textColor } = pickColors(seed);
    return {
      id: `api-${simpleHash(seed)}-${index}`,
      nombre: item.nombre,
      banco: item.ciudad?.trim() ? item.ciudad : 'Convenio',
      ciudad: item.ciudad,
      url: item.url,
      imagen: item.imagen,
      iniciales: initialsFrom(item.nombre),
      bgColor,
      textColor,
    };
  });
}
