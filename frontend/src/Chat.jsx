import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Chat({ setShowChat }) {
  const [chatMessage, setChatMessage] = useState("");
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      alert("Žinutė išsiųsta: " + chatMessage);
      setChatMessage("");
      setShowChat(false);
    }
  };
  return (
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
  );
}
