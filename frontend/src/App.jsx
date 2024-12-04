import { useState } from "react";
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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setShowCart={setShowCart}
        setShowLogin={setShowLogin}
        setShowChat={setShowChat}
        user={user}
        setUser={setUser}
      />
      <Items />
      {showLogin && <LoginForm setShowLogin={setShowLogin} setUser={setUser}/>}
      {showCart && <Cart setShowCart={setShowCart} />}
      {showChat && <Chat setShowChat={setShowChat} />}
    </div>
  );
};

export default ElectronicStore;
