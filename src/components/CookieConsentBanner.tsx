import { useState, useEffect } from "react";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, давал ли пользователь согласие ранее
    const consent = localStorage.getItem("als_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("als_cookie_consent", "accepted");
    setIsVisible(false);
    // Здесь можно инициализировать GA4 или другие скрипты аналитики
  };

  const handleDecline = () => {
    localStorage.setItem("als_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 rounded-2xl border bg-card p-6 text-card-foreground shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
      <h3 className="mb-2 text-lg font-semibold">Налаштування файлів cookie</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Ми використовуємо файли cookie для покращення роботи сайту та аналізу трафіку.
        Натискаючи «Прийняти всі», ви погоджуєтесь з їх використанням.
      </p>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button
          onClick={handleAcceptAll}
          className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Прийняти всі
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 rounded-xl border bg-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          Відхилити
        </button>
      </div>
    </div>
  );
}
