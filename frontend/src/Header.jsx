import {
  MessageOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Header({
  setShowLogin,
  setShowCart,
  setShowChat,
  user,
  setUser,
}) {
  const handleLogout = () => {
    setUser(null);
    alert("Sėkmingai atsijungėte!");
  };

  return (
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
            {user ? (
              <>
                <div className="text-gray-600">
                  <span className="font-medium">{user.vardas}</span>
                  <span className="ml-2 text-sm">({user.tipas})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <UserOutlined className="w-5 h-5" />
                  Atsijungti
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                <UserOutlined className="w-5 h-5" />
                Prisijungti
              </button>
            )}
            {user?.tipas == "klientas" && (
              <>
                <button
                  onClick={() => setShowCart(true)}
                  className="relative p-2 text-gray-600 hover:text-gray-800"
                >
                  <ShoppingCartOutlined className="w-6 h-6" size={12} />
                </button>
                <button
                  onClick={() => setShowChat(true)}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <MessageOutlined className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
