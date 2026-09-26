import { KairoMark } from '@/components/kairo/Icons';

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4 text-soft">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-14 w-14 rounded-full bg-accent/15 animate-ping" />
          <KairoMark className="h-10 w-auto text-accent transition-transform duration-700 animate-pulse" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-ink">
          Dinksira Elsa
        </span>
      </div>
    </div>
  );
}