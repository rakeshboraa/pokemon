const MoveStat = ({label,value}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold capitalize text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default MoveStat;
