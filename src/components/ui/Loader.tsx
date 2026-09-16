export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-3 text-soft">
        <span className="h-4 w-4 animate-spin rounded-full border border-line border-t-accent" />
        <span className="text-sm">Loading</span>
      </div>
    </div>
  );
}