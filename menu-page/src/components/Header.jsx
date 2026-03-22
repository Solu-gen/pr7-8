import { useState, useEffect } from "react";

export default function Header({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Блокировка скролла
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Закрытие при ресайзе
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Массив пунктов меню с названиями и ссылками
  const navItems = [
    { label: "МЕНЮ", href: "#" },
    { label: "СОБЫТИЕ", href: "../index.html#event" },
    { label: "КОНТАКТЫ", href: "../contacts.html" },
    { label: "ДОСТАВКА И ОПЛАТА", href: "../404.html" },
    { label: "О НАС", href: "../index.html#aboutus" },
    { label: "FAQ", href: "../faq.html" },
  ];

  return (
    <header className="px-8 sticky top-0 bg-stone-100 z-[1000]">

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[999]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="flex items-center mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-[72px] w-full">

          {/* Лого */}
          <div className="flex items-center flex-shrink-0">
            <a href="#" className="inline-flex">
              <span className="sr-only">KTER</span>
              <span className="font-bold text-3xl">KTER</span>
            </a>
          </div>

          {/* НАВИГАЦИЯ */}
          <nav
            className={`fixed top-0 right-0 h-full w-[50%] md:w-full bg-white/75 md:bg-transparent z-[1000] transform transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0 md:static md:w-auto md:h-auto"}`}
          >
            <ul className="flex flex-col text-center px-6 mt-20 md:mt-0 md:flex-row md:space-x-8 xl:space-x-10">
              {navItems.map((item, i) => {
                // Для пунктов "О НАС" и "FAQ" добавляем специальные классы видимости
                const isSpecialItem = item.label === "О НАС" || item.label === "FAQ";
                const liClasses = `border-b border-white rounded py-3 md:border-b-0 md:py-0 ${isSpecialItem ? "block min-[768px]:hidden min-[1165px]:block" : "" }`;

                return (
                  <li key={i} className={liClasses}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-lg font-medium text-gray-900 hover:text-indigo-600">
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center ml-auto lg:space-x-8">

            {/* Телефон + вход */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <p className="hidden xl:block text-lg font-medium text-gray-900">
                +7(000)-000-00-00</p>

              <a href="#"
                className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                ВОЙТИ
              </a>
            </div>

            <div className="flex items-center space-x-5">

              {/* Корзина */}
              <button className="relative p-2 text-gray-900 hover:text-indigo-600">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>

                {(
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Бургер */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col justify-between w-11 h-[44px] p-3 z-[1001]"
                aria-label="Открыть меню"
                aria-expanded={menuOpen} >
                <span
                  className={`h-[3px] bg-black rounded transition-all ${menuOpen ? "rotate-45 translate-y-[8.5px]" : ""
                    }`}
                />
                <span
                  className={`h-[3px] bg-black rounded transition-all ${menuOpen ? "opacity-0" : ""
                    }`}
                />
                <span
                  className={`h-[3px] bg-black rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-[8.5px]" : ""
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}