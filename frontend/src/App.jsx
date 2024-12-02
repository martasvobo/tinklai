import { useState } from "react";
import Cart from "./Cart";
import Chat from "./Chat";
import Header from "./Header";
import ItemForm from "./ItemForm";
import Items from "./Items";
import LoginForm from "./LoginForm";

const ElectronicStore = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setShowCart={setShowCart}
        setShowLogin={setShowLogin}
        setShowChat={setShowChat}
      />
      <Items />
      {showLogin && <LoginForm setShowLogin={setShowLogin} />}
      {showCart && <Cart setShowCart={setShowCart} />}
      {showChat && <Chat setShowChat={setShowChat} />}
      <ItemForm />
    </div>
  );
};

export default ElectronicStore;
