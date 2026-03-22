import { useState, useMemo } from "react";
import ProductGrid from "./components/ProductGrid";
import Header from "./components/Header";

const products = [
  { id: 1, title: "БРУСКЕТТА №1", category: "Брускетта", image: "/menu-img/img1.jpg" },
  { id: 2, title: "БРУСКЕТТА №2", category: "Брускетта", image: "/menu-img/img2.jpg" },
  { id: 3, title: "БРУСКЕТТА №3", category: "Брускетта", image: "/menu-img/img3.jpg" },
  { id: 4, title: "КАНАПЕ №1", category: "Канапе", image: "/menu-img/can1.jpg" },
  { id: 5, title: "КАНАПЕ №2", category: "Канапе", image: "/menu-img/can2.jpg" },
  { id: 6, title: "КАНАПЕ №3", category: "Канапе", image: "/menu-img/can3.jpg" },
  { id: 7, title: "ТАРТАЛЕТКИ №1", category: "Тарталетки", image: "/menu-img/tar1.jpg" },
  { id: 8, title: "ТАРТАЛЕТКИ №2", category: "Тарталетки", image: "/menu-img/tar2.jpg" },
  { id: 9, title: "ТАРТАЛЕТКИ №3", category: "Тарталетки", image: "/menu-img/tar3.jpg" },
];

function App() {
  const [filter, setFilter] = useState("Все");
  const [cart, setCart] = useState({});

  // фильтрация
  const filteredProducts = useMemo(() => {
    if (filter === "Все") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  // общее количество товаров в корзине
  const totalCount = useMemo(() => {
    return Object.values(cart).reduce((sum, n) => sum + n, 0);
  }, [cart]);

  // обработчики корзины
  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const updateCount = (id, newCount) => {
    setCart((prev) => {
      const updated = { ...prev };

      if (newCount <= 0) {
        delete updated[id];
      } else {
        updated[id] = newCount;
      }

      return updated;
    });
  };

  return (
    <>
      <Header cartCount={totalCount} />
      <main>
        <div className="bg-stone-100 px-8 py-2 min-[490px]:p-8 space-y-6">
          {/* Фильтры */}
          <div className="borderbox space-x-3 max-[490px]:space-y-2">
            {["Все", "Брускетты", "Канапе", "Тарталетки"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 sm:text-lg rounded-xl border-2 hover:bg-stone-200 ${filter === f ? "bg-stone-400 text-white hover:bg-stone-600" : ""
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Сетка */}
          <ProductGrid
            products={filteredProducts}
            cart={cart}
            addToCart={addToCart}
            updateCount={updateCount}
          />
        </div>
      </main>
    </>
  );
}

export default App;