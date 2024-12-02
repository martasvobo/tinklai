import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Cart({ setShowCart }) {
  const [cartItems, setCartItems] = useState([]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return newQuantity === 0
              ? null
              : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Krepšelis</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <CloseOutlined className="w-6 h-6" />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Krepšelis tuščias</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">€{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MinusOutlined className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <PlusOutlined className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <CloseOutlined className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <div className="flex justify-between font-bold mb-4">
                <span>Iš viso:</span>
                <span>€{getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={() => alert("Užsakymas pateiktas!")}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Užsakyti
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
