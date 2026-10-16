export const QuestionSkeleton = () => (
  <div className="flex min-h-65 flex-col items-center gap-4 animate-pulse" aria-busy="true">
    <div className="h-3 w-20 rounded bg-brand-sand/60" />
    <div className="h-6 w-3/4 rounded bg-brand-sand/60" />
    <div className="h-6 w-32 rounded-xl bg-brand-sand/40" />
    <div className="h-6 w-2/3 rounded bg-brand-sand/60" />
    <div className="mt-2 grid w-full grid-cols-1 sm:grid-cols-2 gap-2.5">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-12 rounded-2xl bg-brand-sand/40" />
      ))}
    </div>
  </div>
);