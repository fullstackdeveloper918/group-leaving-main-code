import React, { useState } from "react";
// import * as htmlToImage from 'html-to-image';

interface Message {
  text: string;
  image?: string;
  stickers?: string[];
  sender: string;
}

const Carousel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "We will miss your company Hagrid! I hope you make it back to us soon.",
      sender: "Professor McGonagall",
      stickers: [],
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const addMessage = (newMessage: Message) => {
    setMessages([...messages, newMessage]);
    setCurrentIndex(messages.length);
  };

  //   const downloadImage = () => {
  //     const node = document.getElementById('carousel-page');
  //     if (node) {
  //       htmlToImage.toPng(node).then((dataUrl:any) => {
  //         const link = document.createElement('a');
  //         link.download = 'carousel-page.png';
  //         link.href = dataUrl;
  //         link.click();
  //       });
  //     }
  //   };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        id="carousel-page"
        className="relative bg-white p-6 rounded-lg shadow-lg min-h-[400px] flex flex-col items-center justify-between"
      >
        {messages.length > 0 && (
          <div>
            <p className="font-serif text-xl text-gray-800">
              {messages[currentIndex].text}
            </p>
            <p className="text-right font-handwriting text-lg text-purple-600 mt-4">
              {messages[currentIndex].sender}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-black border px-4 py-2 rounded"
          onClick={handlePrev}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-black border px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-green-500 text-black border px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Your Message
        </button>
        <button
          className="bg-yellow-500 text-black border px-4 py-2 rounded"
          //   onClick={downloadImage}
        >
          Download
        </button>
      </div>
      {isModalOpen && (
        <MessageModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addMessage}
        />
      )}
    </div>
  );
};

interface ModalProps {
  onClose: () => void;
  onAdd: (message: Message) => void;
}

const MessageModal: React.FC<ModalProps> = ({ onClose, onAdd }) => {
  const [text, setText] = useState("");
  const [sender, setSender] = useState("");
  const [image, setImage] = useState<any | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    onAdd({ text, sender, image, stickers: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Your Message</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Write your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="w-full border rounded p-2 mb-4"
          placeholder="Sender"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button
          className="bg-blue-500 text-black border px-4 py-2 mt-4 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
        <button
          className="bg-red-500 text-black border px-4 py-2 mt-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Carousel;
