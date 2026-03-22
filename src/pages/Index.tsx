import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0b729fa5-4eae-4506-985d-85732f9b04a4/files/d675bd68-ac87-4a1f-a23a-2502b25f101a.jpg";

const Divider = () => (
  <div className="flex items-center gap-4 my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b5d5c0] opacity-60" />
    <span className="text-[#8aab7a] text-xl">✦</span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b5d5c0] opacity-60" />
  </div>
);

const FloralDecor = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`text-[#b5d5c0] opacity-40 select-none pointer-events-none ${className}`} style={{ fontSize: "5rem", lineHeight: 1, ...style }}>
    ❀
  </div>
);

export default function Index() {
  const [rsvp, setRsvp] = useState<"yes" | "no" | null>(null);
  const [menu, setMenu] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [dietary, setDietary] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://functions.poehali.dev/a1492a17-6498-4601-a247-30073f123a86", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rsvp, menu, alcohol, dietary, name }),
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen font-raleway overflow-x-hidden" style={{
        backgroundColor: "#f7faf8",
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(232,244,237,0.55), rgba(247,250,248,0.93))" }} />

        <FloralDecor className="absolute top-8 left-8 animate-float" />
        <FloralDecor className="absolute top-16 right-12 animate-float" style={{ animationDelay: "1.5s" }} />
        <FloralDecor className="absolute bottom-24 left-16 animate-float" style={{ animationDelay: "2s" }} />
        <FloralDecor className="absolute bottom-32 right-8 animate-float" style={{ animationDelay: "0.8s" }} />

        <div className="relative z-10 max-w-2xl opacity-0 animate-fade-up">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-6 font-light" style={{ color: "#1a1a1a" }}>
            Вы приглашены на свадьбу
          </p>
          <h1 className="font-cormorant font-light leading-none mb-2" style={{ color: "#1a1a1a", fontSize: "clamp(4rem, 12vw, 8rem)" }}>
            Никита
          </h1>
          <div className="font-cormorant italic my-2" style={{ color: "#8aab7a", fontSize: "3rem" }}>& </div>
          <h1 className="font-cormorant font-light leading-none mb-8" style={{ color: "#1a1a1a", fontSize: "clamp(4rem, 12vw, 8rem)" }}>
            Татьяна
          </h1>
          <p className="font-cormorant italic font-light" style={{ color: "rgba(26,26,26,0.65)", fontSize: "1.5rem" }}>
            «Двое — одно сердце, одна судьба»
          </p>
        </div>

        <div className="relative z-10 mt-16 opacity-0 animate-fade-up-delay">
          <a
            href="#details"
            className="inline-block font-raleway text-xs uppercase tracking-[0.3em] border px-10 py-3 transition-all duration-300"
            style={{ color: "#1a1a1a", borderColor: "#b5d5c0" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(232,244,237,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Открыть приглашение
          </a>
        </div>

        <div className="absolute bottom-8 z-10 animate-float">
          <Icon name="ChevronDown" size={24} className="text-[#b5d5c0]" />
        </div>
      </section>

      {/* МЕСТО И ВРЕМЯ */}
      <section id="details" className="py-24 px-6" style={{ backgroundColor: "rgba(247,250,248,0.88)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#8aab7a" }}>Когда и где</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#1a1a1a" }}>Место и время</h2>
          <Divider />
          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {[
              { icon: "Calendar", title: "24 июля 2026", sub: "Пятница" },
              { icon: "Clock", title: "В 15:30", sub: "Сбор гостей" },
              { icon: "MapPin", title: "ЗАГС Биробиджан", sub: "просп. 60-летия СССР, 26" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8f4ed" }}>
                  <Icon name={item.icon} size={22} className="text-[#1a1a1a]" />
                </div>
                <p className="font-cormorant text-2xl font-light" style={{ color: "#1a1a1a" }}>{item.title}</p>
                <p className="font-raleway text-xs uppercase tracking-widest" style={{ color: "rgba(26,26,26,0.45)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid rgba(181,213,192,0.3)" }}>
            <iframe src="https://yandex.ru/map-widget/v1/?text=Биробиджан&z=13" width="100%" height="250" frameBorder="0" className="block" title="Карта" />
          </div>
        </div>
      </section>

      {/* ПРОГРАММА */}
      <section className="py-24 px-6" style={{ background: "rgba(232,244,237,0.85)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#8aab7a" }}>Расписание дня</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#1a1a1a" }}>Программа</h2>
          <Divider />
          <div className="mt-10 space-y-0">
            {[
              { time: "15:30", title: "Сбор гостей", desc: "просп. 60-летия СССР, 26 · ЗАГС" },
              { time: "16:00", title: "Бракосочетание", desc: "Торжественная регистрация брака" },
              { time: "18:00", title: "Банкет", desc: "Лунная, 14 · Ресторан «Околица»" },
              { time: "20:00", title: "Торт", desc: "Разрезание свадебного торта" },
              { time: "23:00", title: "Завершение", desc: "Финал незабываемого вечера" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 py-6" style={{ borderBottom: i < 4 ? "1px solid rgba(181,213,192,0.2)" : "none" }}>
                <div className="text-right min-w-[60px]">
                  <span className="font-cormorant text-2xl font-light" style={{ color: "#8aab7a" }}>{item.time}</span>
                </div>
                <div className="w-px self-stretch" style={{ backgroundColor: "rgba(181,213,192,0.4)" }} />
                <div className="text-left flex-1">
                  <p className="font-cormorant text-xl font-medium" style={{ color: "#1a1a1a" }}>{item.title}</p>
                  <p className="font-raleway text-sm mt-1" style={{ color: "rgba(26,26,26,0.55)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* РЕКОМЕНДАЦИИ */}
      <section className="py-24 px-6" style={{ backgroundColor: "rgba(247,250,248,0.88)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#8aab7a" }}>Для вашего удобства</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#1a1a1a" }}>Рекомендации</h2>
          <Divider />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { icon: "Shirt", title: "Дресс-код", text: "Приветствуются белые, зелёные и чёрные оттенки." },
              { icon: "Gift", title: "Подарки", text: "Лучший подарок — ваше присутствие. Если хочется порадовать — конверт будет кстати." },
              { icon: "MapPin", title: "ЗАГС и банкет", text: "Гости могут прибыть как на церемонию в ЗАГС, так и сразу на банкет — по вашему желанию и возможностям." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-8 text-left transition-shadow duration-300 hover:shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid rgba(181,213,192,0.25)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#e8f4ed" }}>
                  <Icon name={item.icon} size={20} className="text-[#1a1a1a]" />
                </div>
                <h3 className="font-cormorant text-2xl font-medium mb-2" style={{ color: "#1a1a1a" }}>{item.title}</h3>
                <p className="font-raleway text-sm leading-relaxed" style={{ color: "rgba(26,26,26,0.55)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОДТВЕРЖДЕНИЕ + ОПРОС */}
      <section className="py-24 px-6" style={{ background: "rgba(232,244,237,0.85)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#8aab7a" }}>Нам важно знать</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#1a1a1a" }}>Подтверждение</h2>
          <Divider />

          {submitted ? (
            <div className="mt-12 py-16 px-8 rounded-3xl shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid rgba(181,213,192,0.3)" }}>
              <div className="text-5xl mb-6">🌿</div>
              <h3 className="font-cormorant text-4xl font-light mb-3" style={{ color: "#1a1a1a" }}>Спасибо!</h3>
              <p className="font-raleway text-sm" style={{ color: "rgba(26,26,26,0.55)" }}>Мы получили ваш ответ и будем рады видеть вас на нашем торжестве.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-8 text-left">
              <div>
                <label className="font-cormorant text-2xl block mb-3 text-center" style={{ color: "#1a1a1a" }}>Ваше имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя и фамилия"
                  required
                  className="w-full rounded-2xl p-4 font-raleway text-sm focus:outline-none transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid rgba(181,213,192,0.5)", color: "#1a1a1a" }}
                />
              </div>
              <div>
                <label className="font-cormorant text-2xl block mb-4 text-center" style={{ color: "#1a1a1a" }}>Смогу ли я прийти?</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "yes" as const, label: "🌿 Да, буду!" },
                    { val: "no" as const, label: "К сожалению, нет" },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRsvp(val)}
                      className="py-4 px-6 rounded-2xl border-2 font-raleway text-sm uppercase tracking-widest transition-all duration-300"
                      style={{
                        borderColor: rsvp === val ? "#1a1a1a" : "#b5d5c0",
                        backgroundColor: rsvp === val ? "#1a1a1a" : "transparent",
                        color: rsvp === val ? "#fff" : "#1a1a1a",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-cormorant text-2xl block mb-4 text-center" style={{ color: "#1a1a1a" }}>Предпочтения в еде</label>
                <div className="grid grid-cols-1 gap-3">
                  {["Стандартное меню", "Вегетарианское меню", "Веганское меню", "Безглютеновое меню"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMenu(opt)}
                      className="py-3 px-5 rounded-xl border text-left font-raleway text-sm transition-all duration-200"
                      style={{
                        borderColor: menu === opt ? "#1a1a1a" : "rgba(181,213,192,0.6)",
                        backgroundColor: menu === opt ? "#1a1a1a" : "transparent",
                        color: menu === opt ? "#fff" : "#1a1a1a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-cormorant text-2xl block mb-4 text-center" style={{ color: "#1a1a1a" }}>Предпочтения в напитках</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Шампанское", "Вино", "Крепкие напитки", "Без алкоголя"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAlcohol(alcohol === opt ? "" : opt)}
                      className="py-3 px-5 rounded-xl border text-left font-raleway text-sm transition-all duration-200"
                      style={{
                        borderColor: alcohol === opt ? "#1a1a1a" : "rgba(181,213,192,0.6)",
                        backgroundColor: alcohol === opt ? "#1a1a1a" : "transparent",
                        color: alcohol === opt ? "#fff" : "#1a1a1a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-cormorant text-2xl block mb-3 text-center" style={{ color: "#1a1a1a" }}>Особые пожелания</label>
                <textarea
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="Аллергии, непереносимость продуктов..."
                  className="w-full rounded-2xl p-4 font-raleway text-sm resize-none focus:outline-none transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid rgba(181,213,192,0.5)", color: "#1a1a1a" }}
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-raleway text-xs uppercase tracking-[0.3em] rounded-2xl transition-colors duration-300"
                style={{ backgroundColor: "#1a1a1a", color: "#fff", opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Отправляем..." : "Отправить ответ"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center" style={{ backgroundColor: "rgba(232,244,237,0.85)", borderTop: "1px solid rgba(181,213,192,0.25)" }}>
        <FloralDecor className="mx-auto mb-4 opacity-20" />
        <p className="font-cormorant italic text-2xl" style={{ color: "rgba(26,26,26,0.5)" }}>Никита & Татьяна</p>
        <p className="font-raleway text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(26,26,26,0.35)" }}>24 июля 2026 · Биробиджан</p>
      </footer>
    </div>
  );
}