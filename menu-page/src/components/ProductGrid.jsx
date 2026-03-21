import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  cart,
  addToCart,
  updateCount,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          count={cart[product.id] || 0}
          addToCart={addToCart}
          updateCount={updateCount}
        />
      ))}
    </div>
  );
}

export default ProductGrid;