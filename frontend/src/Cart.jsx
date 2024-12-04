import { CloseOutlined } from "@ant-design/icons";

export default function Cart({ setShowCart, cartItems, fetchCartItems, user }) {
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.kaina * item.kiekis,
      0
    );
  };
  const removeFromCart = (productId) => {
    fetch(`http://localhost:3000/api/cart/${productId}`, {
      method: "DELETE",
    })
      .then(() => fetchCartItems())
      .catch((error) => console.error("Error removing item from cart:", error));
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
                  <h3 className="font-semibold">{item.pavadinimas}</h3>
                  <p className="text-gray-600">
                    €{Number(item.kaina).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
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
                onClick={() => {
                  fetch(`http://localhost:3000/api/cart/order/${user.id}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cartItems),
                  })
                    .then(() => fetchCartItems())
                    .then(() => {
                      alert("Užsakymas sėkmingai įvykdytas");
                    })
                    .catch((error) =>
                      console.error("Error placing order:", error)
                    );
                }}
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
