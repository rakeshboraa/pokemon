const Loader = () => {
  return (
    <div className="flex min-h-48 items-center justify-center">
      <div className="flex justify-center">
        <div className="relative h-12 w-12 animate-[spin_1.5s_linear_infinite] rounded-full border-2 border-slate-900 bg-white shadow-lg">
          <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-red-500" />
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-slate-900" />
          <div className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-900 bg-white shadow-sm">
            <div className="absolute inset-1 rounded-full bg-slate-200" />
          </div>
          <div className="absolute left-2 top-2 h-2 w-2 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
