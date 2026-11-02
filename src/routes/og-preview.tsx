import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/og-preview")({
  head: () => ({
    meta: [
      { title: "OG Preview — Auto Layout Switcher" },
      { name: "description", content: "Reference 1200x630 preview card for link sharing." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: OgPreview,
});

function SwapKeyboardIcon({ size = 260 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* keyboard body */}
      <rect x="8" y="26" width="104" height="56" rx="10" stroke="currentColor" strokeWidth="4" />
      {/* key rows */}
      {[18, 32, 46].map((y, r) => (
        <g key={r}>
          {[16, 26, 36, 46, 56, 66, 76, 86, 96].slice(0, r === 2 ? 9 : 9).map((x, i) => {
            if (r === 2 && (i === 0 || i === 8)) return null;
            if (r === 1 && i === 4) return null;
            return <rect key={`${r}-${i}`} x={x} y={y + 32} width="7" height="7" rx="1.5" fill="currentColor" opacity={r === 0 ? 0.9 : 0.55} />;
          })}
        </g>
      ))}
      {/* spacebar */}
      <rect x="38" y="72" width="44" height="7" rx="2" fill="currentColor" opacity="0.9" />
      {/* swap arrows */}
      <circle cx="60" cy="98" r="16" fill="currentColor" opacity="0.14" />
      <path d="M52 94h12l-4-4m4 4-4 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,-2)" />
      <path d="M68 102H56l4 4m-4-4 4-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,2)" />
    </svg>
  );
}

const chips = ["100% Local", "Zero Telemetry", "Native WinAPI", "Open Source"];

function OgPreview() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="relative h-[630px] w-[1200px] shrink-0 overflow-hidden rounded-2xl border bg-background">
        <div className="bg-grid pointer-events-none absolute inset-0 h-full" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(ellipse, oklch(0.86 0.19 150 / 35%), transparent 70%)" }}
        />

        <div className="relative flex h-full items-center gap-16 px-20">
          {/* Left: logo mark */}
          <div className="flex shrink-0 flex-col items-center gap-8">
            <div className="inline-flex rounded-3xl border bg-accent p-14 text-accent-foreground shadow-glow">
              <SwapKeyboardIcon size={240} />
            </div>
            <span className="font-mono text-sm text-muted-foreground">Win10 / 11 · x64</span>
          </div>

          {/* Right: copy */}
          <div className="min-w-0 flex-1">
            <h1 className="text-7xl font-bold leading-[1.02] tracking-tight">
              Auto Layout{" "}
              <span className="text-primary">Switcher</span>
            </h1>
            <p className="mt-5 max-w-xl text-2xl leading-snug text-muted-foreground">
              The keyboard switcher that doesn&apos;t spy on you
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border bg-accent px-4 py-1.5 font-mono text-sm text-accent-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-10 font-mono text-lg text-muted-foreground">
              switcher<span className="text-primary">.</span>baisk<span className="text-primary">.</span>com<span className="text-primary">.</span>ua
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
