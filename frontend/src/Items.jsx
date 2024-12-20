import { useState, useEffect } from "react";
import ItemForm from "./ItemForm";

export default function Items({ user, fetchCartItems }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const postProduct = async (values) => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchProducts();
    }
  };

  const addToCart = (product) => {
    fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        itemId: product.id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Prekė pridėta į krepšelį. ");
        fetchCartItems();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Klaida pridedant prekę į krepšelį");
      });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Kraunasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        <p>Klaida: {error}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {product.nuotrauka ? (
              <img
                src={product.nuotrauka?.[0]?.thumbUrl ?? product.nuotrauka}
                alt={product.pavadinimas}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Nėra paveikslėlio</span>
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {product.pavadinimas}
              </h2>
              <p className="text-gray-600 mt-2">
                €{Number(product.kaina).toFixed(2)}
              </p>
              <div className="flex gap-2 mt-4">
                {user?.tipas == "klientas" && (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    Įdėti į krepšelį
                  </button>
                )}
                {user?.tipas == "pardavejas" && (
                  <>
                    <button
                      onClick={() => setEditingId(product.id)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
                    >
                      Keisti
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                    >
                      Trinti
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {user?.tipas == "pardavejas" && (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center min-h-[320px] cursor-pointer hover:bg-gray-50"
            onClick={() => setShowItemForm(true)}
          >
            <div className="text-6xl text-gray-400">+</div>
          </div>
        )}
        <ItemForm
          visible={showItemForm || editingId}
          product={products.find((product) => product.id === editingId)}
          onCancel={() => {
            setShowItemForm(false);
            setEditingId(null);
          }}
          onSubmit={(values) => {
            values.nuotrauka = values.nuotrauka[0].thumbUrl;
            setShowItemForm(false);
            if (editingId) {
              fetch(`http://localhost:3000/api/products/${editingId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }).then(() => fetchProducts());
            } else {
              postProduct(values);
            }
            setEditingId(null);
          }}
        />
      </div>
    </main>
  );
}
