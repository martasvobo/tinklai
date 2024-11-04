import { useState } from "react";
import {
  MessageOutlined,
  MinusOutlined,
  PlusOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet";

const ElectronicStore = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

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

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
    setShowLogin(false);
    alert("Sėkmingai prisijungėte!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Sėkmingai atsijungėte!");
  };

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

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      alert("Žinutė išsiųsta: " + chatMessage);
      setChatMessage("");
      setShowChat(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Parduotuvė</title>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Helmet>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Primityvi elektroninė parduotuvė
              </h1>
              <p className="text-gray-600">Martas Vobolis IFF 2-9</p>
            </div>
            <div className="flex gap-4 items-center">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <UserOutlined className="w-5 h-5" />
                  Atsijungti
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <UserOutlined className="w-5 h-5" />
                  Prisijungti
                </button>
              )}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-gray-800"
              >
                <ShoppingCartOutlined className="w-6 h-6" size={12} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowChat(true)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <MessageOutlined className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
                <p className="text-gray-600 mt-2">${product.price}</p>
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

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Prisijungimas</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseOutlined className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Vartotojo vardas
                </label>
                <div className="flex items-center">
                  <UserOutlined className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    placeholder="Įveskite vartotojo vardą"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Slaptažodis</label>
                <div className="flex items-center">
                  <LockOutlined className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    placeholder="Įveskite slaptažodį"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Prisijungti
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
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
                      <p className="text-gray-600">${item.price}</p>
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
                    <span>${getTotalPrice().toFixed(2)}</span>
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
      )}

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Užduoti klausimą</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseOutlined className="w-6 h-6" />
              </button>
            </div>
            <textarea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="w-full h-32 p-2 border rounded-lg mb-4 resize-none"
              placeholder="Rašykite klausimą..."
            />
            <button
              onClick={handleSendMessage}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <SendOutlined className="w-4 h-4" />
              Siųsti klausimą
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectronicStore;
