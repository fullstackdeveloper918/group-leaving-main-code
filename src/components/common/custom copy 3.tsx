"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SlideImg_0 from "../../assets/images/slide0.png";
import SlideImg_1 from "../../assets/images/slide1.png";
import SlideImg_2 from "../../assets/images/slide2.png";
import SlideImg_3 from "../../assets/images/slide3.png";
import SlideImg_4 from "../../assets/images/slide4.png";
import SlideImg_5 from "../../assets/images/slide5.png";
import Modal from "react-modal";
import axios from "axios";
import { Rnd } from "react-rnd";
import nookies from "nookies";
import jsPDF from "jspdf";
import Draggable from "react-draggable";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";

// Emoji support
import "quill-emoji/dist/quill-emoji.css";
import { Quill } from "react-quill";
import "quill-emoji";
import { toast } from "react-toastify";
// import './MessageEditor.css';
interface Slide {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  link: string;
  card_img: any;
}

interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}
const initialSlides = [
  {
    id: "slide-1",
    title: "Development",
    subtitle: "SCSS Only Slider",
    text: "Learn to create a SCSS-only responsive slider.",
    link: "https://blog.significa.pt/css-only-slider-71727effff0b",
    card_img: SlideImg_0,
  },
  {
    id: "slide-2",
    title: "Web Design",
    subtitle: "Creative Animations",
    text: "Explore modern web design techniques.",
    link: "https://medium.com/web-design",
    card_img: SlideImg_1,
  },
  {
    id: "slide-3",
    title: "JavaScript",
    subtitle: "Advanced ES6 Features",
    text: "Master JavaScript ES6+ features in depth.",
    link: "https://javascript.info/",
    card_img: SlideImg_2,
  },
  {
    id: "slide-4",
    title: "React",
    subtitle: "State Management",
    text: "A guide to managing state effectively in React.",
    link: "https://reactjs.org/docs/hooks-intro.html",
    card_img: SlideImg_3,
  },
  {
    id: "slide-5",
    title: "Next.js",
    subtitle: "Optimizing Performance",
    text: "Learn Next.js best practices for fast web apps.",
    link: "https://nextjs.org/docs/advanced-features",
    card_img: SlideImg_4,
  },
];
const Custom: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const params = useParams();
  const [id, setId] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gifs, setGifs] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState<any>();
  // let slideIndex=activeSlide?3:0
  const [activeSlideIndex, setActiveSlideIndex] = useState<any>(0);
  useEffect(() => {
    const newIndex = activeSlide ? activeSlide : 0;
    setActiveSlideIndex(newIndex);
  }, [activeSlide]);
  const [elements, setElements] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState("");
  const sliderRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [params]);

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  useEffect(() => {
    const storedElements: any = localStorage.getItem("slideElements");
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("slideElements", JSON.stringify(elements));
    }
  }, [elements]);

  const [slides, setSlides] = useState<any>([]);

  const pathname = usePathname();
  const isEditorPath = /^\/share\/editor\/[^/]+$/.test(pathname);

  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");

    if (storedElements) {
      const parsed = JSON.parse(storedElements);
      // setParsedElements(parsed); // assuming you use this elsewhere

      // Get max slideIndex from parsed elements
      const maxIndex = Math.max(...parsed.map((el: any) => el.slideIndex));

      // Define initial slides (your default slides)
      const initialSlides = isEditorPath
        ? [
            {
              id: "slide-1",
              title: "Development",
              subtitle: "SCSS Only Slider",
              text: "Learn to create a SCSS-only responsive slider.",
              link: "https://blog.significa.pt/css-only-slider-71727effff0b",
              card_img: SlideImg_0,
            },
          ]
        : ([
            {
              id: "slide-1",
              title: "Development",
              subtitle: "SCSS Only Slider",
              text: "Learn to create a SCSS-only responsive slider.",
              link: "https://blog.significa.pt/css-only-slider-71727effff0b",
              card_img: SlideImg_0,
            },
            {
              id: "slide-2",
              title: "Web Design",
              subtitle: "Creative Animations",
              text: "Explore modern web design techniques.",
              link: "https://medium.com/web-design",
              card_img: SlideImg_1,
            },
            {
              id: "slide-3",
              title: "JavaScript",
              subtitle: "Advanced ES6 Features",
              text: "Master JavaScript ES6+ features in depth.",
              link: "https://javascript.info/",
              card_img: SlideImg_2,
            },
            {
              id: "slide-4",
              title: "React",
              subtitle: "State Management",
              text: "A guide to managing state effectively in React.",
              link: "https://reactjs.org/docs/hooks-intro.html",
              card_img: SlideImg_3,
            },
            {
              id: "slide-5",
              title: "Next.js",
              subtitle: "Optimizing Performance",
              text: "Learn Next.js best practices for fast web apps.",
              link: "https://nextjs.org/docs/advanced-features",
              card_img: SlideImg_4,
            },
          ] as any);

      // Create a new array of slides that includes placeholders if needed
      const filledSlides = [...initialSlides];

      for (let i = initialSlides.length; i <= maxIndex; i++) {
        filledSlides.push({
          id: `slide-${i + 1}`,
          title: `Slide ${i + 1}`,
          subtitle: "Placeholder Subtitle",
          text: "This is a dynamically generated slide.",
          link: "#",
          card_img: `https://via.placeholder.com/300x200?text=Slide+${i + 1}`,
        });
      }

      // Update state with the new full list of slides
      setSlides(filledSlides);
    } else {
      const initialSlides = isEditorPath
        ? [
            {
              id: "slide-1",
              title: "Development",
              subtitle: "SCSS Only Slider",
              text: "Learn to create a SCSS-only responsive slider.",
              link: "https://blog.significa.pt/css-only-slider-71727effff0b",
              card_img: SlideImg_0,
            },
          ]
        : ([
            {
              id: "slide-1",
              title: "Development",
              subtitle: "SCSS Only Slider",
              text: "Learn to create a SCSS-only responsive slider.",
              link: "https://blog.significa.pt/css-only-slider-71727effff0b",
              card_img: SlideImg_0,
            },
            {
              id: "slide-2",
              title: "Web Design",
              subtitle: "Creative Animations",
              text: "Explore modern web design techniques.",
              link: "https://medium.com/web-design",
              card_img: SlideImg_1,
            },
            {
              id: "slide-3",
              title: "JavaScript",
              subtitle: "Advanced ES6 Features",
              text: "Master JavaScript ES6+ features in depth.",
              link: "https://javascript.info/",
              card_img: SlideImg_2,
            },
            {
              id: "slide-4",
              title: "React",
              subtitle: "State Management",
              text: "A guide to managing state effectively in React.",
              link: "https://reactjs.org/docs/hooks-intro.html",
              card_img: SlideImg_3,
            },
            {
              id: "slide-5",
              title: "Next.js",
              subtitle: "Optimizing Performance",
              text: "Learn Next.js best practices for fast web apps.",
              link: "https://nextjs.org/docs/advanced-features",
              card_img: SlideImg_4,
            },
          ] as any);

      // Create a new array of slides that includes placeholders if needed
      const filledSlides = [...initialSlides];
      setSlides(filledSlides);
    }
  }, []);

  const sendEditorData = async () => {
    const item = {
      editor_messages: elements,
      user_uuid: userInfo?.uuid,
      messages_unique_id: id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/card/add-editor-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload data");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleAddMessageClick = () => {
    setShowModal(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleSaveMessage = () => {
    if (activeSlideIndex === null) {
      alert("No active slide selected!");
      return;
    }

    const newMessage = {
      type: "text",
      content: editorContent || "Default message",
      slideIndex: activeSlideIndex,
      x: 0,
      y: 0,
      user_uuid: userInfo?.uuid,
    };

    setElements([...elements, newMessage]);
    setShowModal(false);
    setEditorContent("");
    sendEditorData();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/card/update-editor-messages`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      if (data) {
        const imageUrl = data.file;

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            if (activeSlideIndex !== null) {
              const newImage = {
                type: "image",
                content: `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`,
                slideIndex: activeSlideIndex,
                x: 0,
                y: 0,
                user_uuid: userInfo?.uuid,
              };

              setElements((prevElements) => [...prevElements, newImage]);
            }
          };
          reader.readAsDataURL(file);
        }
        sendEditorData();
      } else {
        console.error("Invalid response: missing URL");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchGifs = async (term: string) => {
    try {
      const response = await axios.get(
        "https://tenor.googleapis.com/v2/search",
        {
          params: {
            q: term || "wave",
            key: "AIzaSyBphMbpVXm8Rc9CnWX7W3LuePqIHgSWoDo",
            client_key: "my_test_app",
            limit: 100,
            locale: "en_US",
          },
        }
      );

      setGifs(
        response.data.results.map((result: any) => result.media_formats.gif.url)
      );
      sendEditorData();
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) fetchGifs(searchTerm);
  };

  const openModal = () => {
    setIsOpen(true);
    fetchGifs("trending");
  };

  const handleAddPage = () => {
    const newSlide = {
      id: `slide-${slides.length + 1}`,
      title: "New Slide",
      subtitle: "New Subtitle",
      text: "This is a new slide",
      link: "https://example.com",
      // card_img: SlideImg_5,
    };

    setSlides([...slides, newSlide]);
    setActiveSlide(slides.length + 1);
    toast.success(`New slide added `);

    // toast.success(`${slides.length + 1} slide added `)
  };

  const fetchImageAsBase64 = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();

      if (blob.type === "image/avif") {
        const imageBitmap = await createImageBitmap(blob);
        const canvas = new OffscreenCanvas(
          imageBitmap.width,
          imageBitmap.height
        );
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(imageBitmap, 0, 0);
        return canvas.convertToBlob({ type: "image/png" }).then((pngBlob) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(pngBlob);
          });
        });
      }

      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const slideWidth = 210;
    const slideHeight = 297;

    for (let i = 0; i < slides.length; i++) {
      const base64Image = await fetchImageAsBase64(slides[i].card_img.src);

      if (!base64Image) continue;

      if (i !== 0) pdf.addPage();

      pdf.addImage(
        base64Image,
        "JPEG",
        10,
        10,
        slideWidth - 20,
        slideHeight / 2
      );

      elements.forEach((el) => {
        if (el.slideIndex === i + 1) {
          if (el.type === "text") {
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 255);
            pdf.text(el.content, 10 + el.x, slideHeight / 2 + 20 + el.y);
          } else if (el.type === "image" || el.type === "gif") {
            pdf.addImage(
              el.content,
              "JPEG",
              10 + el.x,
              slideHeight / 2 + 20 + el.y,
              50,
              50
            );
          }
        }
      });
    }

    pdf.save("slides_with_positions.pdf");
  };

  const handleSlideChange = (index: number) => {
    // Store previous active index
    const prevActiveIndex = activeSlideIndex;

    // Set new active index
    setActiveSlideIndex(index);

    if (sliderRef.current) {
      sliderRef.current.value = index.toString();
    }

    // Force re-render of slides to update their positions
    setSlides((prevSlides: any) => [...prevSlides]);
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      handleSlideChange(activeSlideIndex - 1);
    }
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < slides.length - 1) {
      handleSlideChange(activeSlideIndex + 1);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Number.parseInt(e.target.value);
    handleSlideChange(newIndex);
  };

  const totalSlides = slides.length;

  const openEnvelop = () => {
    sendEditorData();
    router.push(`/envelop/${id}`);
  };


  return (
    <>
      <div className="card-carousel-container" id="main-carousle">
        <div className="editor_option" style={{ marginBottom: "15px" }}>
          <div>
            <button
              className="add_btn"
              onClick={handleAddMessageClick}
              style={{
                padding: "10px",
                borderRadius: "50px",
              }}
            >
              Add Your Message
            </button>
          </div>
          <div className="search_input">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div className="upload_svg">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="AddPhotoAlternateIcon"
              >
                <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4 2 3 3-4 4 5z"></path>
              </svg>
            </div>
          </div>
          <div className="search_input" onClick={openModal}>
            <div className="upload_svg">
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="GifIcon"
              >
                <path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path>
              </svg>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleAddPage}
              className="px-4 py-2 add_btn border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
              style={{
                color: "white",
                marginLeft: "40px",
                borderRadius: "70px",
              }}
            >
              +
            </button>
          </div>
          {id == "fwzDVjvbQ_X" ? (
            ""
          ) : (
            <div style={{ textAlign: "center" }}>
              <button className="add-btn" onClick={openEnvelop}>
                Preview
              </button>
            </div>
          )}
          {/* <div style={{ textAlign: "center" }}>
            <button style={{
              padding: "10px",
              borderRadius: "50px",
            }} className="add_btn" onClick={sendEditorData}> click</button>
          </div> */}
          {/* <div style={{ textAlign: "center" }}>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 add_btn border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
            style={{color:"white", marginLeft:"20px", borderRadius: "70px"}}
          >
            Download
          </button>
        </div> */}
        </div>

        <div className="card-carousel">
          <div className="carousel-wrapper">
            <div className="carousel-slides">
              {slides.map((slide: any, index: any) => {
                // Calculate position classes

                let positionClass = "slide-hidden";

                if (index === activeSlideIndex) {
                  positionClass = "slide-active";
                } else if (index === activeSlideIndex - 1) {
                  positionClass = "slide-prev";
                } else if (index === activeSlideIndex - 2) {
                  positionClass = "slide-prev-2";
                } else if (index === activeSlideIndex + 1) {
                  positionClass = "slide-next";
                } else if (index === activeSlideIndex + 2) {
                  positionClass = "slide-next-2";
                }

                return (
                  <div
                    key={slide.id}
                    className={`carousel-slide ${positionClass}`}
                    onClick={() => handleSlideChange(index)}
                  >
                    {slide?.card_img && (
                      <div className="slide-content">
                        <img
                          src={
                            typeof slide.card_img === "string"
                              ? slide.card_img
                              : slide.card_img?.src
                          }
                          alt={`slide-${index + 1}`}
                          className="slide-image"
                        />
                      </div>
                    )}
                    {/* Only render draggable elements for the active slide */}
                    {/* //   <DraggableElement */}
                    {/* //   key={i}
                    //   content={el.content}
                    //   type={el.type}
                    //   index={i}
                    //   setElements={setElements}
                    //   initialX={el.x || 0}
                    //   initialY={el.y || 0}
                    //   initialWidth={el.width || 210}
                    //   initialHeight={el.height || 80}
                    // /> */}
                    {index === activeSlideIndex &&
                      elements
                        .filter((el) => el.slideIndex === activeSlideIndex)
                        .map((el, i) => {
                          const originalIndex = elements.findIndex(
                            (e) => e === el
                          );
                          return (
                            <DraggableElement
                              key={originalIndex}
                              content={el.content}
                              type={el.type}
                              index={originalIndex}
                              setElements={setElements}
                              initialX={el.x || 0}
                              initialY={el.y || 0}
                              width={el.width || 320}
                              height={el.height || 200}
                              isDraggable={true}
                            />
                          );
                        })}
                  </div>
                );
              })}

              {showModal && (
                <Draggable axis="both" handle=".drag-handle">
                  <div
                    className="modal-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className="drag-handle"
                      style={{
                        cursor: "move",
                        marginBottom: "10px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Add Your Message
                    </div>
                    <ReactQuill
                      theme="snow"
                      value={editorContent}
                      onChange={setEditorContent}
                      placeholder="Enter your message"
                      style={{
                        height: "auto",
                        marginBottom: "20px",
                        paddingBottom: "0px",
                      }}
                      // modules={{
                      //   toolbar: [
                      //     [{ header: "1" }, { header: "2" }, { font: [] }],
                      //     // [{ list: "ordered" }, { list: "bullet" }],
                      //     // [{ script: "sub" }, { script: "super" }],
                      //     // [{ indent: "-1" }, { indent: "+1" }],
                      //     [{ align: [] }],
                      //     ["bold", "italic", "underline", "strike"],
                      //     [{ color: [] }, { background: [] }],
                      //     // [{ font: [] }],
                      //     // [{ size: [] }],
                      //     ["link", "image", "video"],
                      //     // ["blockquote", "code-block"],
                      //     // ["clean"],
                      //   ],
                      // }}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ align: [] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ color: [] }, { background: [] }],
                        ],
                      }}
                    />
                    <div className="flex gap-4 mt-0 items-center justify-center">
                      <button
                        onClick={() => setShowModal(false)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "4px",
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveMessage}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#007BFF",
                          color: "#fff",
                          borderRadius: "4px",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  {/* <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor-input"
        toolbarClassName="editor-toolbar"
        placeholder="Enter your message here"
        toolbar={{
          options: ['fontFamily', 'inline', 'textAlign', 'emoji'],
          inline: { options: ['bold', 'italic', 'underline'] },
          fontFamily: {
            options: ['Arial', 'Georgia', 'Comic Sans MS', 'Courier New'],
          },
        }}
      />

      <div className="button-group">
        <button className="cancel-btn">Cancel</button>
        <button className="save-btn">Save</button>
      </div>
    </div> */}
                </Draggable>
              )}
            </div>

            <div className="carousel-controls">
              <button className="carousel-arrow prev" onClick={handlePrevSlide}>
                ◀
              </button>

              <div className="carousel-slider-container">
                <div className="progress-bar-container">
                  <div className="progress-track"></div>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${((activeSlideIndex + 1) / totalSlides) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="progress-dot"
                    style={{
                      left: `calc(${
                        ((activeSlideIndex + 1) / totalSlides) * 100
                      }% - 7px)`, // centers the dot
                    }}
                  ></div>
                </div>
              </div>

              <button className="carousel-arrow next" onClick={handleNextSlide}>
                ▶
              </button>
            </div>

            <div className="page-indicator">
              Page <b> {activeSlideIndex + 1} </b> of <b>{totalSlides}</b>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="p-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto"
        >
          <h2 className="text-lg font-bold mb-4">Select a GIF</h2>
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Search GIFs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-black border rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
          <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96">
            {gifs.map((gifUrl, index) => (
              <img
                key={index}
                src={gifUrl || "/placeholder.svg"}
                alt="GIF"
                style={{ width: "80%", height: "80%" }}
                className="rounded-lg cursor-pointer"
                onClick={() => {
                  setElements((prev) => [
                    ...prev,
                    {
                      type: "gif",
                      content: gifUrl,
                      slideIndex: activeSlideIndex,
                      x: 0,
                      y: 0,
                      user_uuid: userInfo?.uuid,
                    },
                  ]);
                  closeModal();
                }}
              />
            ))}
          </div>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Close
          </button>
        </Modal>
      </div>
    </>
  );
};

const DraggableElement: React.FC<any> = ({
  content,
  type,
  index,
  setElements,
  initialX,
  initialY,
  width = 220,
  height = 200,
  isDraggable = true,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });

  // Store the original image dimensions (to preserve the aspect ratio)
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number;
    height: number;
  }>({ width, height });

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  const updateElement = (
    newX: number,
    newY: number,
    newWidth?: number,
    newHeight?: number
  ) => {
    setElements((prev: any) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        x: newX,
        y: newY,
        width: newWidth ?? updated[index].width,
        height: newHeight ?? updated[index].height,
        user_uuid: userInfo?.uuid,
      };
      localStorage.setItem("slideElements", JSON.stringify(updated));
      return updated;
    });
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setOriginalDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });
  };

  return (
    <Rnd
      bounds="parent"
      position={position}
      size={size}
      onDragStop={(_, d) => {
        setPosition({ x: d.x, y: d.y });
        updateElement(d.x, d.y);
      }}
      onResizeStop={(_, __, ref, ___, pos) => {
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);

        if (type === "image" || type === "gif") {
          // Maintain the aspect ratio for images and gifs
          const aspectRatio =
            originalDimensions.width / originalDimensions.height;
          const scaledHeight = newWidth / aspectRatio;

          setSize({ width: newWidth, height: scaledHeight });
          setPosition(pos);
          updateElement(pos.x, pos.y, newWidth, scaledHeight);
        } else {
          // Non-image element resizing
          setSize({ width: newWidth, height: newHeight });
          setPosition(pos);
          updateElement(pos.x, pos.y, newWidth, newHeight);
        }
      }}
      disableDragging={!isDraggable}
      enableResizing={type === "image" || type === "gif"}
      className={`${
        type === "image" || type === "gif"
          ? "flex items-center justify-center border border-gray-300 bg-gray-100"
          : ""
      }`}
    >
      {type === "image" || type === "gif" ? (
        <img
          src={content || "/placeholder.svg"}
          alt="uploaded"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // Use "contain" to prevent cropping
            pointerEvents: "none",
          }}
          onLoad={handleImageLoad} // Capture the original image dimensions
        />
      ) : (
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </Rnd>
  );
};

// const DraggableElement = ({
//   content,
//   type,
//   index,
//   setElements,
//   initialX,
//   initialY,
//   initialWidth = 200,
//   initialHeight = 100,
// }: {
//   content: string;
//   type: string;
//   index: number;
//   setElements: React.Dispatch<React.SetStateAction<any[]>>;
//   initialX: number;
//   initialY: number;
//   initialWidth?: number;
//   initialHeight?: number;
// }) => {
//   const [userInfo1, setUserInfo1] = useState<any>(null);
//   const [position, setPosition] = useState({ x: initialX, y: initialY });
//   const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

//   useEffect(() => {
//     const cookies = nookies.get();
//     const userInfoFromCookie = cookies.userInfo
//       ? JSON.parse(cookies.userInfo)
//       : null;
//     setUserInfo1(userInfoFromCookie);
//   }, []);

//   const updateElement = (x: number, y: number, width: number, height: number) => {
//     setElements((prevElements) => {
//       const updatedElements = [...prevElements];
//       updatedElements[index] = {
//         ...updatedElements[index],
//         x,
//         y,
//         width,
//         height,
//         user_uuid: userInfo1?.uuid,
//       };
//       localStorage.setItem("slideElements", JSON.stringify(updatedElements));
//       return updatedElements;
//     });
//   };

//   return (
//     <Rnd
//       size={{ width: size.width, height: size.height }}
//       position={{ x: position.x, y: position.y }}
//       onDragStop={(e, d) => {
//         setPosition({ x: d.x, y: d.y });
//         updateElement(d.x, d.y, size.width, size.height);
//       }}
//       onResizeStop={(e, direction, ref, delta, position) => {
//         const newWidth = parseInt(ref.style.width);
//         const newHeight = parseInt(ref.style.height);
//         setSize({ width: newWidth, height: newHeight });
//         setPosition(position);
//         updateElement(position.x, position.y, newWidth, newHeight);
//       }}
//       bounds="parent"
//       style={{
//         zIndex: 10,
//         border: type === "text" ? "1px dashed #ccc" : "none",
//         padding: "5px",
//         background: type === "text" ? "#fff" : "transparent",
//         overflow: "hidden",
//       }}
//     >
//       {type === "image" || type === "gif" ? (
//         <img
//           src={content}
//           alt="content"
//           style={{
//             // width: "100%",
//             // height: "100%",
//             objectFit: "contain",
//             pointerEvents: "none",
//           }}
//         />
//       ) : (
//         <div
//           dangerouslySetInnerHTML={{ __html: content }}
//           // style={{
//           //   // width: "100%",
//           //   // height: "100%",
//           //   overflow: "auto",
//           //   wordBreak: "break-word",
//           // }}
//         />
//       )}
//     </Rnd>
//   );
// };

export default Custom;
