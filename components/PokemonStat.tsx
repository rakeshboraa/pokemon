interface PokemonStatProps {
  label: string;
  value: string | number;
  borderColor?: string;
}

export default function PokemonStat({
  label,
  value,
  borderColor = "border-sky-100",
}: PokemonStatProps) {
  return (
    <div
      className={`rounded-xl border-2 ${borderColor} bg-white/80 p-4 shadow-sm`}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}