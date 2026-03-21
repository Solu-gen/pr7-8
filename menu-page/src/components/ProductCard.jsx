import { useState } from "react";

function ProductCard({
  product,
  count,
  addToCart,
  updateCount,
}) {
  const [hovered, setHovered] = useState(false);

  const inCart = count > 0;

  return (
    <div
      className="h-[55vh] transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className={`rounded-xl overflow-hidden transition-all duration-400 ${hovered ? "h-[24vh] w-[70%]" : "h-[43vh] w-[100%]"
            }`}
        />
      </div>
      <div className="px-8 sm:px-4">
        <h2 className="font-bold text-xl mt-4">{product.title}</h2>

        {hovered && (
          <>
            <p>
              Брускетта такая, канапе другое, тарталетки третьи
            </p>

            <p className="pt-2">
              <span className="font-semibold">Количество:</span> 12 штук
            </p>
          </>
        )}

        <div className="font-semibold">1000 г</div>
      </div>
        {hovered && (
          <div className="flex py-2 lg:py-4 justify-between items-center">
            <div className="font-bold text-xl ml-3 lg:ml-6">2914 ₽</div>

            {!inCart ? (
              <button
                onClick={() => addToCart(product.id)}
                className="font-medium text-lg text-center w-[55%] lg:w-[50%] border-2 rounded-xl py-2 mr-3 lg:mr-6 lg:py-3 hover:bg-stone-400 hover:text-white">
                В КОРЗИНУ
              </button>
            ) : (
              <div className="flex items-center justify-between border-2 rounded-xl px-4 py-1 gap-3 w-[50%]">
                <button className="text-2xl"
                  onClick={() =>
                    updateCount(product.id, count - 1)
                  }
                >
                  -
                </button>

                <span className="text-xl">{count}</span>

                <button className="text-2xl"
                  onClick={() =>
                    updateCount(product.id, count + 1)
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}

    </div>
  );
}

export default ProductCard;