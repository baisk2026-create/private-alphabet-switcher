import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Zap, SlidersHorizontal, Check, X, Download, ShieldCheck, Keyboard, Info } from "lucide-react";

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

type Lang = "uk" | "ru" | "en";

const dict = {
  uk: {
    badge: "100% локально · нуль телеметрії",
    h1a: "Перемикач розкладки, який за вами не шпигує.",
    sub: "Легка та безпечна альтернатива Punto Switcher. Працює на 100% локально. Нуль телеметрії. Без доступу до інтернету.",
    cta: "Завантажити для Windows - $2.99",
    once: "Одноразова покупка · Без підписки",
    hintTitle: "Як запустити тестову версію",
    hintText: "Додаток працює на 100% локально і не має доступу до мережі. Оскільки це рання тестова збірка без платного сертифіката Windows, фільтр SmartScreen може показати попередження про невідомого видавця. Для запуску натисніть «Докладніше» (More info) → «Виконати у будь-якому разі» (Run anyway).",
    features: [
      ["Ізольований від мережі", "Упакований в MSIX контейнер. Доступ до інтернету вирізано."],
      ["Чистий WinAPI", "Жодного фонового сміття. Миттєва нативна продуктивність."],
      ["Абсолютний контроль", "Автоматично конвертує кирилицю та латиницю лише тоді, коли це потрібно."],
    ],
    stats: [["0 байт", "телеметрії"], ["Заблоковано", "доступ до інтернету"], ["<15 MB", "використання RAM"]],
    traditional: "Традиційні перемикачі",
    rows: [
      ["Телеметрія", "0 байт", "Статистика використання"],
      ["Доступ до інтернету", "Заблоковано на рівні ОС", "Завжди онлайн"],
      ["Використання RAM", "< 15 MB", "80–200 MB"],
      ["Автовгадування", "Лише на ваш запит", "Агресивне, часто хибне"],
    ],
    closing: "Друкуйте вільно. Ніхто не стежить.",
    modalTitle: "Ви встигли прямо до релізу!",
    modalText: "Ми віддаємо вам повністю робочу Beta-версію БЕЗКОШТОВНО в обмін на ваш фідбек.",
    modalBtn: "Завантажити Beta-версію (.msix)",
    note: "Примітка: Windows може показати попередження SmartScreen для нових інді-застосунків. Його можна сміливо пропустити — наш код повністю ізольований від мережі.",
  },
  ru: {
    badge: "100% локально · ноль телеметрии",
    h1a: "Переключатель раскладки, который за вами не шпионит.",
    sub: "Легкая и безопасная альтернатива Punto Switcher. Работает на 100% локально. Ноль телеметрии. Без доступа в интернет.",
    cta: "Скачать для Windows - $2.99",
    once: "Разовая покупка · Без подписки",
    hintTitle: "Как запустить тестовую версию",
    hintText: "Приложение работает на 100% локально и не имеет доступа к сети. Поскольку это ранняя тестовая сборка без платного сертификата Windows, фильтр SmartScreen может показать предупреждение о неизвестном издателе. Для запуска нажмите «Подробнее» (More info) → «Выполнить в любом случае» (Run anyway).",
    features: [
      ["Изолирован от сети", "Упакован в MSIX контейнер. Доступ в интернет вырезан."],
      ["Чистый WinAPI", "Никакого фонового мусора. Мгновенная нативная производительность."],
      ["Абсолютный контроль", "Автоматически конвертирует кириллицу и латиницу только тогда, когда это нужно."],
    ],
    stats: [["0 байт", "телеметрии"], ["Заблокирован", "доступ в интернет"], ["<15 MB", "использование RAM"]],
    traditional: "Традиционные переключатели",
    rows: [
      ["Телеметрия", "0 байт", "Статистика использования"],
      ["Доступ в интернет", "Заблокирован на уровне ОС", "Всегда онлайн"],
      ["Использование RAM", "< 15 MB", "80–200 MB"],
      ["Автоугадывание", "Только по запросу", "Агрессивное, часто ошибочное"],
    ],
    closing: "Печатайте свободно. Никто не следит.",
    modalTitle: "Вы успели прямо к релизу!",
    modalText: "Мы отдаем вам полностью рабочую Beta-версию БЕСПЛАТНО в обмен на ваш фидбек.",
    modalBtn: "Скачать Beta-версию (.msix)",
    note: "Примечание: Windows может показать предупреждение SmartScreen для новых инди-приложений. Его можно смело пропустить — наш код полностью изолирован от сети.",
  },
  en: {
    badge: "100% local · zero telemetry",
    h1a: "The Keyboard Switcher That Doesn't Spy on You.",
    sub: "A lightweight, privacy-first alternative to Punto Switcher. 100% local. Zero telemetry. No internet access required.",
    cta: "Get for Windows - $2.99",
    once: "One-time purchase · No subscription",
    hintTitle: "How to run the beta version",
    hintText: "The app runs 100% locally and has no network access. Since this is an early test build without a paid Windows certificate, SmartScreen may show an unknown-publisher warning. To launch, click “More info” → “Run anyway”.",
    features: [
      ["Air-gapped by Design", "Packaged as an MSIX container with network capabilities strictly removed."],
      ["Zero Lag, Pure WinAPI", "No heavy background processes. Native performance."],
      ["Absolute Control", "Converts alphabets only when you explicitly ask for it."],
    ],
    stats: [["0 bytes", "of telemetry"], ["Blocked", "internet access"], ["<15 MB", "RAM usage"]],
    traditional: "Traditional Switchers",
    rows: [
      ["Telemetry sent", "0 bytes", "Usage & keystroke stats"],
      ["Internet access", "Blocked at OS level", "Always online"],
      ["RAM usage", "< 15 MB", "80–200 MB"],
      ["Auto-guessing", "Only when you ask", "Aggressive, often wrong"],
    ],
    closing: "Type freely. Nobody's watching.",
    modalTitle: "You caught us right before launch!",
    modalText: "Get the fully working Beta version for FREE today in exchange for your feedback.",
    modalBtn: "Download Free Beta (.msix)",
    note: "Note: Windows might show a SmartScreen warning for new indie apps. You can safely bypass it; our code is fully air-gapped.",
  },
};

const icons = [Lock, Zap, SlidersHorizontal];

const DOWNLOAD_URL =
  "https://github.com/baisk2026-create/private-alphabet-switcher/releases/download/v0.1.0-preview/AutoLayoutSwitcher-preview-win-x64.zip";

function Index() {
  const [lang, setLang] = useState<Lang>("uk");
  const t = dict[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const Cta = () => (
    <a
      href={DOWNLOAD_URL}
      download
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.03]"
    >
      <Download size={18} /> {t.cta}
    </a>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 h-[700px]" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-semibold">
          <Keyboard className="text-primary" size={20} /> Auto Layout Switcher
        </div>
        <nav className="flex items-center gap-1 font-mono text-xs" aria-label="Language">
          {(["uk", "ru", "en"] as Lang[]).map((l, i) => (
            <span key={l} className="flex items-center gap-1">
              {i > 0 && <span className="text-muted-foreground/50">|</span>}
              <button
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded px-1.5 py-0.5 transition ${lang === l ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.toUpperCase()}
              </button>
            </span>
          ))}
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-6">
        <section className="py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-accent px-3 py-1 font-mono text-xs text-accent-foreground">
            <ShieldCheck size={14} /> {t.badge}
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Auto Layout Switcher.{" "}
            <span className="text-muted-foreground">{t.h1a}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{t.sub}</p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Cta />
            <p className="font-mono text-xs text-muted-foreground">{t.once}</p>
            <div className="mt-1 flex max-w-xl items-start gap-3 rounded-xl border bg-card/50 px-4 py-3 text-left">
              <Info size={15} className="mt-0.5 shrink-0 text-muted-foreground" />
              <div className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">{t.hintTitle}. </span>
                {t.hintText}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 pb-24 md:grid-cols-3">
          {t.features.map(([title, text], i) => {
            const Icon = icons[i] ?? Lock;
            return (
              <div key={i} className="rounded-2xl border bg-card p-7 transition hover:border-primary/40">
                <div className="mb-5 inline-flex rounded-lg bg-accent p-2.5 text-accent-foreground"><Icon size={20} /></div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            );
          })}
        </section>

        <section className="pb-24">
          <div className="mb-10 grid gap-4 md:grid-cols-3">
            {t.stats.map(([v, l], i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 text-center">
                <div className="font-mono text-4xl font-bold text-primary">{v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <div className="grid grid-cols-3 bg-secondary px-6 py-4 text-sm font-semibold">
              <span />
              <span className="text-primary">Auto Layout Switcher</span>
              <span className="text-muted-foreground">{t.traditional}</span>
            </div>
            {t.rows.map(([label, us, them], i) => (
              <div key={i} className="grid grid-cols-3 items-center border-t px-6 py-4 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="flex items-center gap-2 font-mono"><Check size={16} className="text-primary" />{us}</span>
                <span className="flex items-center gap-2 text-muted-foreground"><X size={16} className="text-destructive" />{them}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24 text-center">
          <h2 className="text-3xl font-bold">{t.closing}</h2>
          <div className="mt-8"><Cta /></div>
        </section>
      </main>

      <footer className="border-t py-8 text-center font-mono text-xs text-muted-foreground">
        © 2026 Auto Layout Switcher
      </footer>

    </div>
  );
}
