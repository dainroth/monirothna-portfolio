/** Figma-style multiplayer cursor with a name tag and an optional comment bubble. */
export default function CanvasCursor({
  label = "Roth",
  color = "#2f9e5b",
  note,
}: {
  label?: string;
  color?: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <svg width="22" height="22" viewBox="0 0 24 24" className="-ml-0.5 -mt-0.5 shrink-0 drop-shadow">
        <path
          d="M3 2l7.5 19 2.6-7.9L21 10.5z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-4 flex flex-col items-start gap-1.5">
        <span
          className="rounded-full px-2.5 py-0.5 font-display text-xs font-semibold text-white shadow"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
        {note && (
          <span className="max-w-48 rounded-2xl rounded-tl-sm border-2 border-ink bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-brutal">
            {note}
          </span>
        )}
      </div>
    </div>
  );
}
