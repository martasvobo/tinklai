import { useEffect, useState } from "react";
import Cart from "./Cart";
import Chat from "./Chat";
import Header from "./Header";
import Items from "./Items";
import LoginForm from "./LoginForm";

const ElectronicStore = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setShowCart={setShowCart}
        setShowLogin={setShowLogin}
        setShowChat={setShowChat}
        user={user}
        setUser={setUser}
      />
      <Items user={user} fetchCartItems={() => fetchCartItems(user.id)} />
      {showLogin && <LoginForm setShowLogin={setShowLogin} setUser={setUser} />}
      {showCart && (
        <Cart
          user={user}
          setShowCart={setShowCart}
          cartItems={cartItems}
          fetchCartItems={() => fetchCartItems(user.id)}
        />
      )}
      {showChat && <Chat setShowChat={setShowChat} user={user} />}
    </div>
  );
};

export default ElectronicStore;
