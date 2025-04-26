import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Draggable from "react-draggable";

const EditorCarousel = () => {
  const [messages, setMessages] = useState<
    { id: number; text: string; x: number; y: number; slide: number; name: string; zIndex: number }[]
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://groupleavingcards.com/assets/design/617318f94c962c605abdeabb.jpg",
    "https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif",
    "https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif",
    "https://groupleavingcards.com/assets/design/6734d2bbe8c991dba26a0288_sm.webp",
    "https://groupleavingcards.com/assets/design/66967675b0d2b479aa568c98_sm.avif",
    "https://groupleavingcards.com/assets/design/66d88499b4fb75024aa2d8de_sm.avif",
  ];

  // Load saved messages from local storage when the component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(savedMessages);
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  const addMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      text: "",
      x: 50,
      y: 50,
      slide: currentSlide,
      name: "",
      zIndex: 1000, // Ensure it's above the carousel
    };
    setMessages([...messages, newMessage]);
  };

  const saveMessage = (id: number, name: string, text: string) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === id ? { ...msg, name, text } : msg
    );
    setMessages(updatedMessages);

    // Save updated messages to localStorage
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  return (
    <div className="slider-container mt-3" style={{ width: "85%", padding: "0px 30px" }}>
      {/* Add Message Button */}
      <div className="editor_option mb-3">
        <button
          className="add_btn"
          onClick={addMessage}
          style={{
            padding: "10px",
            border: "none",
            borderRadius: "50px",
            backgroundColor: "#007bff",
            color: "#fff",
          }}
        >
          Add Message
        </button>
      </div>

      <div style={{ position: "relative", height: "700px" }}>
        {/* Carousel */}
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  objectFit: "cover",
                  zIndex: 1, // Ensure carousel images are behind messages
                }}
              />
              {/* Display Saved Messages */}
              {messages
                .filter((message) => message.slide === index)
                .map((message) => (
                  <div
                    key={message.id}
                    style={{
                      position: "absolute",
                      top: `${message.y}px`,
                      left: `${message.x}px`,
                      color: "blue",
                      fontWeight: "bold",
                      fontSize: "16px",
                      zIndex: message.zIndex, // Ensure the message stays above carousel image
                    }}
                  >
                    {message.text}
                    <br />
                    <span style={{ fontSize: "12px", fontStyle: "italic" }}>
                      {message.name}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </Slider>

        {/* Draggable Messages */}
        {messages
          .filter((message) => message.slide === currentSlide)
          .map((message) => (
            <Draggable
  key={message.id}
  defaultPosition={{ x: message.x, y: message.y }}
  onStop={(e, data) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === message.id ? { ...msg, x: data.x, y: data.y } : msg
    );
    setMessages(updatedMessages);

    // Save updated messages to localStorage
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  }}
  onStart={() => {
    // When dragging starts, ensure the message is on top of the carousel
    const updatedMessages = messages.map((msg) =>
      msg.id === message.id ? { ...msg, zIndex: 10000 } : msg
    );
    setMessages(updatedMessages);
  }}
>
  <div
    style={{
      position: "absolute",
      padding: "10px",
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white background
      border: "1px solid #ddd",
      borderRadius: "5px",
      cursor: "move",
      zIndex: message.zIndex, // Ensure high zIndex during drag
      width: "250px",
    }}
  >
    {/* Message Form */}
    <div>
      <label style={{ fontWeight: "bold", display: "block",  backgroundColor: "rgba(255, 255, 255, 0.1)", }}>
        Name:
      </label>
      <input
        type="text"
        value={message.name}
        // style={{}}
        onChange={(e) =>
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === message.id ? { ...msg, name: e.target.value } : msg
            )
          )
        }
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.1)"
        }}
      />
    </div>
    <div>
      <label style={{ fontWeight: "bold", display: "block",backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
        Message:
      </label>
      <textarea
        value={message.text}
        onChange={(e) =>
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === message.id ? { ...msg, text: e.target.value } : msg
            )
          )
        }
        style={{
          width: "100%",
          height: "50px",
          marginBottom: "10px",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.1)"
        }}
      />
    </div>
    <button
      onClick={() => saveMessage(message.id, message.name, message.text)}
      style={{
        padding: "5px 10px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Save Message
    </button>
  </div>
</Draggable>

          ))}
      </div>
    </div>
  );
};

export default EditorCarousel;