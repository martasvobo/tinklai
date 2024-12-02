import { useState } from "react";

export default function Items() {
  const [cartItems, setCartItems] = useState([]);
  const products = [
    {
      id: 1,
      name: "Ausinės",
      price: 149.99,
      image: "headphones.webp",
    },
    {
      id: 2,
      name: "Išmanusis laikrodis",
      price: 299.99,
      image: "laikrodis.jpg",
    },
    {
      id: 3,
      name: "Kolonėlė",
      price: 79.99,
      image: "speaker.jpg",
    },
  ];

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-2">€{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Įdėti į krepšelį
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
