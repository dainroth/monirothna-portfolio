/** Small mono label at the top of each widget. */
export default function WidgetLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
        dark ? "text-cream/60" : "text-ink/60"
      }`}
    >
      {children}
    </p>
  );
}
