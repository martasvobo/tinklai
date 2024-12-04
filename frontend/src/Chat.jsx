import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function Chat({ setShowChat, user }) {
  const [chatMessage, setChatMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [questionId, setQuestionId] = useState(null);

  const fetchMessages = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inquiries?userId=${user.id}&userType=${user.tipas}`
      );
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(user);
  }, [user]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) {
      return;
    }
    if (user.tipas == "klientas") {
      try {
        await fetch("http://localhost:3000/api/inquiries/create", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: chatMessage, userId: user.id }),
        });
        fetchMessages(user);
        setChatMessage("");
        setShowChat(false);
        alert("Klausimas išsiųstas!");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Klausimo išsiųsti nepavyko");
      }
    } else {
      try {
        await fetch(
          `http://localhost:3000/api/inquiries/answer/${questionId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer: chatMessage, id: questionId }),
          }
        );
        fetchMessages(user);
        setChatMessage("");
        setShowChat(false);
        alert("Atsakymas išsiųstas!");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Atsakymo išsiųsti nepavyko");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex">
      <div className="w-1/3 bg-white p-4 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Previous Messages</h3>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 bg-gray-100 rounded ${
              msg.id === questionId ? "bg-blue-300" : ""
            }`}
            onClick={() => setQuestionId(msg.id)}
          >
            <p className="font-semibold">Q: {msg.klausimas}</p>
            <p className="mt-2">A: {msg.atsakymas}</p>
          </div>
        ))}
      </div>

      {(user.tipas == "klientas" || questionId) && (
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {user.tipas == "klientas"
                  ? "Užduoti klausimą"
                  : "Atsakyti į klausimą"}
              </h2>
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
            />
            <button
              onClick={handleSendMessage}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <SendOutlined className="w-4 h-4" />
              {user.tipas == "klientas" ? "Siųsti klausimą" : "Atsakyti"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
