import { useState } from 'react';

/**
 * Logo: imagen remota (API Lambda) o cuadrado con iniciales (mock).
 */
export default function BankLogo({
  banco,
  iniciales,
  bgColor,
  textColor,
  imagen,
  faded = false,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(imagen) && !imgFailed;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {showImage ? (
        <img
          src={imagen}
          alt=""
          className="w-16 h-16 rounded-xl object-cover select-none transition-opacity duration-200"
          style={{ opacity: faded ? 0.35 : 1 }}
          title={banco}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl select-none transition-opacity duration-200"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            opacity: faded ? 0.35 : 1,
          }}
          title={banco}
        >
          {iniciales}
        </div>
      )}
      <span
        className="text-xs font-semibold text-gray-700 text-center leading-tight transition-opacity duration-200"
        style={{opacity: faded ? 0.35 : 1}}
      >
        {banco}
      </span>
    </div>
  );
}
