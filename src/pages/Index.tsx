import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0b729fa5-4eae-4506-985d-85732f9b04a4/files/196ead58-abe4-413c-baca-6afbcc92ffca.jpg";

const Divider = () => (
  <div className="flex items-center gap-4 my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#f2b5c5] opacity-60" />
    <span className="text-[#c9a96e] text-xl">✦</span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#f2b5c5] opacity-60" />
  </div>
);

const FloralDecor = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`text-[#f2b5c5] opacity-40 select-none pointer-events-none ${className}`} style={{ fontSize: "5rem", lineHeight: 1, ...style }}>
    ❀
  </div>
);

export default function Index() {
  const [rsvp, setRsvp] = useState<"yes" | "no" | null>(null);
  const [menu, setMenu] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [dietary, setDietary] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen font-raleway overflow-x-hidden" style={{ backgroundColor: "#fdf8f5" }}>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(252,228,236,0.5), rgba(253,248,245,0.92))" }} />

        <FloralDecor className="absolute top-8 left-8 animate-float" />
        <FloralDecor className="absolute top-16 right-12 animate-float" style={{ animationDelay: "1.5s" }} />
        <FloralDecor className="absolute bottom-24 left-16 animate-float" style={{ animationDelay: "2s" }} />
        <FloralDecor className="absolute bottom-32 right-8 animate-float" style={{ animationDelay: "0.8s" }} />

        <div className="relative z-10 max-w-2xl opacity-0 animate-fade-up">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-6 font-light" style={{ color: "#c2717f" }}>
            Вы приглашены на свадьбу
          </p>
          <h1 className="font-cormorant font-light leading-none mb-2" style={{ color: "#c2717f", fontSize: "clamp(4rem, 12vw, 8rem)" }}>
            Никита
          </h1>
          <div className="font-cormorant italic my-2" style={{ color: "#c9a96e", fontSize: "3rem" }}>& </div>
          <h1 className="font-cormorant font-light leading-none mb-8" style={{ color: "#c2717f", fontSize: "clamp(4rem, 12vw, 8rem)" }}>
            Татьяна
          </h1>
          <p className="font-cormorant italic font-light" style={{ color: "rgba(194,113,127,0.7)", fontSize: "1.5rem" }}>
            «Двое — одно сердце, одна судьба»
          </p>
        </div>

        <div className="relative z-10 mt-16 opacity-0 animate-fade-up-delay">
          <a
            href="#details"
            className="inline-block font-raleway text-xs uppercase tracking-[0.3em] border px-10 py-3 transition-all duration-300"
            style={{ color: "#c2717f", borderColor: "#f2b5c5" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(252,228,236,0.6)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Открыть приглашение
          </a>
        </div>

        <div className="absolute bottom-8 z-10 animate-float">
          <Icon name="ChevronDown" size={24} className="text-[#f2b5c5]" />
        </div>
      </section>

      {/* МЕСТО И ВРЕМЯ */}
      <section id="details" className="py-24 px-6" style={{ backgroundColor: "#fdf8f5" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#c9a96e" }}>Когда и где</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#c2717f" }}>Место и время</h2>

          <Divider />

          <div className="grid md:grid-cols-3 gap-10 mt-10">
            {[
              { icon: "Calendar", title: "14 июня 2025", sub: "Суббота" },
              { icon: "Clock", title: "В 15:00", sub: "Начало торжества" },
              { icon: "MapPin", title: "«Усадьба Роз»", sub: "ул. Садовая, 12" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fce4ec" }}>
                  <Icon name={item.icon} size={22} className="text-[#c2717f]" />
                </div>
                <p className="font-cormorant text-2xl font-light" style={{ color: "#c2717f" }}>{item.title}</p>
                <p className="font-raleway text-xs uppercase tracking-widest" style={{ color: "rgba(194,113,127,0.5)" }}>{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid rgba(242,181,197,0.3)" }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?text=Москва&z=12"
              width="100%"
              height="250"
              frameBorder="0"
              className="block"
              title="Карта"
            />
          </div>
        </div>
      </section>

      {/* ПРОГРАММА */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(to bottom, rgba(252,228,236,0.3), #fdf8f5)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#c9a96e" }}>Расписание дня</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#c2717f" }}>Программа</h2>
          <Divider />

          <div className="mt-10 space-y-0">
            {[
              { time: "14:30", title: "Сбор гостей", desc: "Шампанское и знакомство" },
              { time: "15:00", title: "Церемония", desc: "Торжественная регистрация брака" },
              { time: "16:00", title: "Фуршет", desc: "Лёгкие закуски в саду" },
              { time: "17:30", title: "Банкет", desc: "Праздничный ужин и танцы" },
              { time: "19:00", title: "Торт", desc: "Разрезание свадебного торта" },
              { time: "23:00", title: "Завершение", desc: "Финал незабываемого вечера" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 py-6" style={{ borderBottom: i < 5 ? "1px solid rgba(242,181,197,0.2)" : "none" }}>
                <div className="text-right min-w-[60px]">
                  <span className="font-cormorant text-2xl font-light" style={{ color: "#c9a96e" }}>{item.time}</span>
                </div>
                <div className="w-px self-stretch" style={{ backgroundColor: "rgba(242,181,197,0.4)" }} />
                <div className="text-left flex-1">
                  <p className="font-cormorant text-xl font-medium" style={{ color: "#c2717f" }}>{item.title}</p>
                  <p className="font-raleway text-sm mt-1" style={{ color: "rgba(194,113,127,0.6)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* РЕКОМЕНДАЦИИ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#fdf8f5" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#c9a96e" }}>Для вашего удобства</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#c2717f" }}>Рекомендации</h2>
          <Divider />

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              { icon: "Shirt", title: "Дресс-код", text: "Нежные пастельные оттенки. Просим воздержаться от белого цвета." },
              { icon: "Gift", title: "Подарки", text: "Лучший подарок — ваше присутствие. Если хочется порадовать — конверт будет кстати." },
              { icon: "Car", title: "Парковка", text: "Бесплатная парковка на территории усадьбы на 50 мест." },
              { icon: "Hotel", title: "Проживание", text: "Для гостей забронированы номера в отеле «Белые розы» — 5 минут от усадьбы." },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 text-left transition-shadow duration-300 hover:shadow-md"
                style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(242,181,197,0.2)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#fce4ec" }}>
                  <Icon name={item.icon} size={20} className="text-[#c2717f]" />
                </div>
                <h3 className="font-cormorant text-2xl font-medium mb-2" style={{ color: "#c2717f" }}>{item.title}</h3>
                <p className="font-raleway text-sm leading-relaxed" style={{ color: "rgba(194,113,127,0.6)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОДТВЕРЖДЕНИЕ + ОПРОС */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(to bottom, rgba(252,228,236,0.3), #fdf8f5)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#c9a96e" }}>Нам важно знать</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#c2717f" }}>Подтверждение</h2>
          <Divider />

          {submitted ? (
            <div className="mt-12 py-16 px-8 rounded-3xl shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.8)", border: "1px solid rgba(242,181,197,0.3)" }}>
              <div className="text-5xl mb-6">🌸</div>
              <h3 className="font-cormorant text-4xl font-light mb-3" style={{ color: "#c2717f" }}>Спасибо!</h3>
              <p className="font-raleway text-sm" style={{ color: "rgba(194,113,127,0.6)" }}>Мы получили ваш ответ и будем рады видеть вас на нашем торжестве.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-8 text-left">
              {/* RSVP */}
              <div>
                <label className="font-cormorant text-2xl block mb-4 text-center" style={{ color: "#c2717f" }}>Смогу ли я прийти?</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "yes" as const, label: "💐 Да, буду!" },
                    { val: "no" as const, label: "К сожалению, нет" },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRsvp(val)}
                      className="py-4 px-6 rounded-2xl border-2 font-raleway text-sm uppercase tracking-widest transition-all duration-300"
                      style={{
                        borderColor: rsvp === val ? "#c2717f" : "#f2b5c5",
                        backgroundColor: rsvp === val ? "#c2717f" : "transparent",
                        color: rsvp === val ? "#fff" : "#c2717f",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* МЕНЮ */}
              <div>
                <label className="font-cormorant text-2xl block mb-4 text-center" style={{ color: "#c2717f" }}>Предпочтения в еде</label>
                <div className="grid grid-cols-1 gap-3">
                  {["Стандартное меню", "Вегетарианское меню", "Веганское меню", "Безглютеновое меню"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMenu(opt)}
                      className="py-3 px-5 rounded-xl border text-left font-raleway text-sm transition-all duration-200"
                      style={{
                        borderColor: menu === opt ? "#c2717f" : "rgba(242,181,197,0.6)",
                        backgroundColor: menu === opt ? "#c2717f" : "transparent",
                        color: menu === opt ? "#fff" : "#c2717f",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* АЛКОГОЛЬ */}
              <div>
                <label className="font-cormorant text-2xl block mb-4 text-center" style={{ color: "#c2717f" }}>Предпочтения в напитках</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Шампанское", "Вино", "Крепкие напитки", "Без алкоголя"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAlcohol(alcohol === opt ? "" : opt)}
                      className="py-3 px-5 rounded-xl border text-left font-raleway text-sm transition-all duration-200"
                      style={{
                        borderColor: alcohol === opt ? "#c2717f" : "rgba(242,181,197,0.6)",
                        backgroundColor: alcohol === opt ? "#c2717f" : "transparent",
                        color: alcohol === opt ? "#fff" : "#c2717f",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* DIETARY */}
              <div>
                <label className="font-cormorant text-2xl block mb-3 text-center" style={{ color: "#c2717f" }}>Особые пожелания</label>
                <textarea
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="Аллергии, непереносимость продуктов..."
                  className="w-full rounded-2xl p-4 font-raleway text-sm resize-none focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(242,181,197,0.4)",
                    color: "#c2717f",
                  }}
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 font-raleway text-xs uppercase tracking-[0.3em] rounded-2xl transition-colors duration-300"
                style={{ backgroundColor: "#c2717f", color: "#fff" }}
              >
                Отправить ответ
              </button>
            </form>
          )}
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section className="py-24 px-6" style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="font-raleway text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#c9a96e" }}>Есть вопросы?</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-12" style={{ color: "#c2717f" }}>Контакты</h2>
          <Divider />

          <p className="font-cormorant italic text-xl mb-10" style={{ color: "rgba(194,113,127,0.7)" }}>
            Если у вас возникли вопросы — свяжитесь с нашими организаторами
          </p>

          <div className="space-y-6">
            {[
              { icon: "Phone", label: "Организатор Анна", value: "+7 (900) 123-45-67", href: "tel:+79001234567" },
              { icon: "MessageCircle", label: "Telegram", value: "@wedding_manager", href: "https://t.me/wedding_manager" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#fce4ec" }}>
                  <Icon name={item.icon} size={18} className="text-[#c2717f]" />
                </div>
                <div className="text-left">
                  <p className="font-raleway text-xs uppercase tracking-widest mb-0.5" style={{ color: "rgba(194,113,127,0.4)" }}>{item.label}</p>
                  <a href={item.href} className="font-cormorant text-2xl transition-colors" style={{ color: "#c2717f" }}>
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center" style={{ backgroundColor: "#fdf8f5", borderTop: "1px solid rgba(242,181,197,0.2)" }}>
        <FloralDecor className="mx-auto mb-4 opacity-20" />
        <p className="font-cormorant italic text-2xl" style={{ color: "rgba(194,113,127,0.5)" }}>Никита & Татьяна</p>
        <p className="font-raleway text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(194,113,127,0.3)" }}>14 июня 2025 · Усадьба Роз</p>
      </footer>
    </div>
  );
}