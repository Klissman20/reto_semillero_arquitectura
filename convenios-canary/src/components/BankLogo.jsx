/**
 * Placeholder logo for a bank — colored square with initials.
 * Replicates the visual weight of real bank logos without requiring assets.
 */
export default function BankLogo({ banco, iniciales, bgColor, textColor, faded = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
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
      <span
        className="text-xs font-semibold text-gray-700 text-center leading-tight transition-opacity duration-200"
        style={{ opacity: faded ? 0.35 : 1 }}
      >
        {banco}
      </span>
    </div>
  );
}
