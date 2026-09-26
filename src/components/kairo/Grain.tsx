/**
 * Fixed film-grain overlay (z-4). The shifting 3-step animation itself
 * lives in globals.css so it keeps running even before hydration.
 */
export default function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
