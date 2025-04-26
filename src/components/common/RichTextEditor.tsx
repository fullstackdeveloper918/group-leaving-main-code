import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onSaveMessage: (message: string) => void;
}

const RichTextEditor = ({ onSaveMessage }:any) => {
    const [message, setMessage] = useState("");

    const handleSave = () => {
      if (message) {
        onSaveMessage(message);
        setMessage(""); // Reset the editor
      }
    };

  return (
    <div>
      <ReactQuill
        value={message}
        onChange={setMessage}
        placeholder="Write your message here..."
        style={{ height: "100px", marginBottom: "10px" }}
      />
      <button
        onClick={handleSave}
        style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff" }}
      >
        Add Message
      </button>
    </div>
  );
};

export default RichTextEditor;
