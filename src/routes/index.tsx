import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Zap, SlidersHorizontal, Check, X, Download, ShieldCheck, Keyboard } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auto Layout Switcher — Privacy-first keyboard switcher for Windows" },
      { name: "description", content: "A lightweight, privacy-first alternative to Punto Switcher. 100% local. Zero telemetry. No internet access required." },
      { property: "og:title", content: "Auto Layout Switcher — The keyboard switcher that doesn't spy on you" },
      { property: "og:description", content: "100% local. Zero telemetry. Native WinAPI. Under 15MB RAM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: Lock, title: "Air-gapped by Design.", text: "Packaged as an MSIX container with network capabilities strictly removed." },
  { icon: Zap, title: "Zero Lag, Pure WinAPI.", text: "No heavy Electron or bloated processes. Native performance." },
  { icon: SlidersHorizontal, title: "Absolute Control.", text: "No unwanted algorithmic guesses. Converts alphabets only when you need it." },
];

const rows = [
  { label: "Telemetry sent", us: "0 bytes", them: "Usage & keystroke stats" },
  { label: "Internet access", us: "Blocked at OS level", them: "Always online" },
  { label: "RAM usage", us: "< 15 MB", them: "80–200 MB" },
  { label: "Auto-guessing", us: "Only when you ask", them: "Aggressive, often wrong" },
];

function Index() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Cta = () => (
    <button
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.03]"
    >
      <Download size={18} /> Get for Windows - $4.99
    </button>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 h-[700px]" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-semibold">
          <Keyboard className="text-primary" size={20} /> Auto Layout Switcher
        </div>
        <span className="font-mono text-xs text-muted-foreground">v1.0 · Windows 10/11</span>
      </header>

      <main className="relative mx-auto max-w-6xl px-6">
        <section className="py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">
            <ShieldCheck size={14} /> 100% local · zero telemetry
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Auto Layout Switcher.{" "}
            <span className="text-muted-foreground">The Keyboard Switcher That Doesn't Spy on You.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A lightweight, privacy-first alternative to Punto Switcher. 100% local. Zero telemetry. No internet access required.
          </p>
          <div className="mt-10"><Cta /></div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">One-time purchase · No subscription</p>
        </section>

        <section className="grid gap-4 pb-24 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-card p-7 transition hover:border-primary/40">
              <div className="mb-5 inline-flex rounded-lg bg-accent p-2.5 text-accent-foreground"><Icon size={20} /></div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>

        <section className="pb-24">
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {[["0 bytes", "of telemetry"], ["Blocked", "internet access"], ["<15 MB", "RAM usage"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl border bg-card p-6 text-center">
                <div className="font-mono text-4xl font-bold text-primary">{v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <div className="grid grid-cols-3 bg-secondary px-6 py-4 text-sm font-semibold">
              <span />
              <span className="text-primary">Auto Layout Switcher</span>
              <span className="text-muted-foreground">Traditional Switchers</span>
            </div>
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-3 items-center border-t px-6 py-4 text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="flex items-center gap-2 font-mono"><Check size={16} className="text-primary" />{r.us}</span>
                <span className="flex items-center gap-2 text-muted-foreground"><X size={16} className="text-destructive" />{r.them}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24 text-center">
          <h2 className="text-3xl font-bold">Type freely. Nobody's watching.</h2>
          <div className="mt-8"><Cta /></div>
        </section>
      </main>

      <footer className="border-t py-8 text-center font-mono text-xs text-muted-foreground">
        © 2026 Auto Layout Switcher
      </footer>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-2xl border bg-card p-8 shadow-glow animate-in zoom-in-95">
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X size={18} /></button>
            <h2 className="text-2xl font-bold">You caught us right before launch!</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We are putting the final touches on our payment system. Since you are one of our early believers, we want to give you the fully working Beta version for FREE today in exchange for your feedback.
            </p>
            <a href="/AutoLayoutSwitcher.msix" download className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:opacity-90">
              <Download size={18} /> Download Free Beta (.msix)
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              Note: Windows might show a SmartScreen warning for new indie apps. You can safely bypass it; our code is fully air-gapped.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
