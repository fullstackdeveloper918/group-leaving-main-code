"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
// import { useDrag } from "@use-gFuel/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SlideImg_0 from "../../assets/images/slide0.png";
import SlideImg_1 from "../../assets/images/slide1.png";
import SlideImg_2 from "../../assets/images/slide2.png";
import SlideImg_3 from "../../assets/images/slide3.png";
import SlideImg_4 from "../../assets/images/slide4.png";
import SlideImg_5 from "../../../public/paper_grid.png";
import SlideImg_6 from "../../../public/fafafa.png";
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
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import "quill-emoji/dist/quill-emoji.css";
import { Quill } from "react-quill";
import "quill-emoji";
import { toast } from "react-toastify";
import TextEditor from "../editor/components/TextEditor";
import { DraggableElement } from "./DraggableElement";

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
  {
    id: "slide-6",
    title: "new slide",
    subtitle: "new slide for new content",
    text: "new content",
    link: "https://nextjs.org/docs/advanced-features",
    card_img: SlideImg_6,
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [gifs, setGifs] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [elements, setElements] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState<any>("");
  const sliderRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<string>("");
  const [slides, setSlides] = useState<any[]>([]);

  const pathname = usePathname();
  const isEditorPath = /^\/share\/editor\/[^/]+$/.test(pathname);

  // Initialize params.id
  useEffect(() => {
    if (params.id) setId(params.id);
  }, [params]);

  // Initialize userInfo from cookies
  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  // Load elements from API and initialize slides
  useEffect(() => {
    const getEditorData = async () => {
      try {
        const response = await fetch(
          "https://dating.goaideme.com/card/edit-messages-by-unique-id/fwzDVjvbQ_X",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        const apiElements = data?.data[0]?.editor_messages || [];
        setElements(apiElements);

        // Determine the maximum slideIndex from API elements
        const maxIndex = apiElements.length > 0
          ? Math.max(...apiElements.map((el: any) => el.slideIndex), 0)
          : 0;

        // Initialize slides based on path and max slideIndex
        let filledSlides = isEditorPath
          ? [{
              id: "slide-1",
              title: "Development",
              subtitle: "SCSS Only Slider",
              text: "Learn to create a SCSS-only responsive slider.",
              link: "https://blog.significa.pt/css-only-slider-71727effff0b",
              card_img: SlideImg_0,
            }]
          : [...initialSlides];

        // Add additional slides up to maxIndex
        for (let i = filledSlides.length; i <= maxIndex; i++) {
          filledSlides.push({
            id: `slide-${i + 1}`,
            title: "New Slide",
            subtitle: "New Subtitle",
            text: "This is a dynamically generated slide.",
            link: "https://example.com",
            card_img: SlideImg_5,
          });
        }

        setSlides(filledSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
        setElements([]);
        setSlides(isEditorPath ? [initialSlides[0]] : initialSlides);
      }
    };

    getEditorData();
  }, []);

  // Save elements to localStorage and update server
  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("slideElements", JSON.stringify(elements));
      updateEditorData();
    }
  }, [elements]);

  // Send editor data to server
  const sendEditorData = async () => {
    const item = {
      editor_messages: elements,
      user_uuid: userInfo?.uuid,
      messages_unique_id: id,
    };
    try {
      const response = await fetch(
        "https://dating.goaideme.com/card/add-editor-messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) throw new Error("Failed to upload data");
      const data = await response.json();
      console.log("Data uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  // Update editor data on server
  const updateEditorData = async () => {
    const item = {
      editor_messages: elements,
      user_uuid: userInfo?.uuid,
      messages_unique_id: id,
    };
    try {
      const response = await fetch(
        "https://dating.goaideme.com/card/add-editor-messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) throw new Error("Failed to upload data");
      const data = await response.json();
      console.log("Data uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  // Handle adding a new message (and new slide)
  const handleAddMessageClick = () => {
    const newSlide = {
      id: `slide-${slides.length + 1}`,
      title: "New Slide",
      subtitle: "New Subtitle",
      text: "This is a new slide",
      link: "https://example.com",
      card_img: SlideImg_5,
    };

    setSlides((prevSlides: any[]) => [...prevSlides, newSlide]);
    const newSlideIndex = slides.length;
    setActiveSlideIndex(newSlideIndex);
    setShowModal(true);

    if (sliderRef.current) {
      sliderRef.current.value = newSlideIndex.toString();
    }
  };

  // Save message from editor
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

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        "https://dating.goaideme.com/card/update-editor-messages",
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      if (data?.file) {
        const imageUrl = data.file;
        const reader = new FileReader();
        reader.onloadend = () => {
          if (activeSlideIndex !== null) {
            const newImage = {
              type: "image",
              content: `https://dating.goaideme.com/${imageUrl}`,
              slideIndex: activeSlideIndex,
              x: 0,
              y: 0,
              width: 320,
              height: 200,
              user_uuid: userInfo?.uuid,
            };
            setElements((prevElements) => [...prevElements, newImage]);
            sendEditorData();
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Fetch GIFs or stickers
  const fetchGifs = async (term: string, type: "GIF" | "Sticker" = "GIF") => {
    try {
      const response = await axios.get("https://tenor.googleapis.com/v2/search", {
        params: {
          q: term,
          key: "AIzaSyAPjx0xF2FgbpxJe60S-QdKvYozNrVyFGY",
          client_key: "test",
          limit: 100,
          locale: "en_US",
          media_filter: type === "Sticker" ? "minimal" : "gif",
          searchfilter: type === "Sticker" ? "sticker" : undefined,
        },
      });
      const gifUrls = response.data.results.map((result: any) =>
        type === "Sticker"
          ? result.media_formats?.tinygif_transparent?.url ||
            result.media_formats?.gif?.url
          : result.media_formats.gif.url
      );
      setGifs(gifUrls);
      setOpenDropdown(false);
    } catch (error) {
      console.error("Error fetching GIFs/Stickers:", error);
    }
  };

  // Handle GIF/sticker search
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm) fetchGifs(searchTerm);
  };

  // Open GIF/sticker modal
  const openModal = (modalType: string) => {
    setIsOpen(true);
    setType(modalType);
    fetchGifs(modalType === "Sticker" ? "wave" : "trending", modalType as "GIF" | "Sticker");
  };

  // Add a new slide
  const handleAddPage = () => {
    const newSlide = {
      id: `slide-${slides.length + 1}`,
      title: "New Slide",
      subtitle: "New Subtitle",
      text: "This is a new slide",
      link: "https://example.com",
      card_img: SlideImg_5,
    };
    setSlides((prevSlides: any[]) => [...prevSlides, newSlide]);
  };

  // Convert image to base64 for PDF
  const fetchImageAsBase64 = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      if (blob.type === "image/avif") {
        const imageBitmap = await createImageBitmap(blob);
        const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
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

  // Download slides as PDF
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const slideWidth = 210;
    const slideHeight = 297;

    for (let i = 0; i < slides.length; i++) {
      const base64Image = await fetchImageAsBase64(slides[i].card_img.src);
      if (!base64Image) continue;

      if (i !== 0) pdf.addPage();
      pdf.addImage(base64Image, "JPEG", 10, 10, slideWidth - 20, slideHeight / 2);

      elements.forEach((el) => {
        if (el.slideIndex === i + 1) {
          if (el.type === "text") {
            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 255);
            pdf.text(el.content, 10 + el.x, slideHeight / 2 + 20 + el.y);
          } else if (el.type === "image" || el.type === "gif") {
            pdf.addImage(el.content, "JPEG", 10 + el.x, slideHeight / 2 + 20 + el.y, 50, 50);
          }
        }
      });
    }
    pdf.save("slides_with_positions.pdf");
  };

  // Handle slide navigation
  const handleSlideChange = (index: number) => {
    setActiveSlideIndex(index);
    if (sliderRef.current) sliderRef.current.value = index.toString();
    setSlides((prevSlides: any[]) => [...prevSlides]);
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) handleSlideChange(activeSlideIndex - 1);
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < slides.length - 1) handleSlideChange(activeSlideIndex + 1);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Number.parseInt(e.target.value);
    handleSlideChange(newIndex);
  };

  // Close modals
  const closeModal = () => {
    setIsOpen(false);
    setShowImageModal(false);
    setSelectedElement(null);
  };

  const closeModals = () => {
    setShowModal(false);
    setShowImageModal(false);
    setSelectedElement(null);
  };

  // Toggle dropdown for additional options
  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  // Handle image click for editing
  const handleImageClick = (element: any, index: number) => {
    setSelectedElement({ ...element, originalIndex: index });
    setShowImageModal(true);
    setShowModal(false);
  };

  // Delete an element
  const handleDeleteElement = (index: number) => {
    setElements((prev) => prev.filter((_, i) => i !== index));
    closeModals();
  };

  // Remove duplicate elements
  const uniqueElements = elements.reduce((acc, current) => {
    const duplicate = acc.find(
      (item: any) =>
        item.content === current.content &&
        item.slideIndex === current.slideIndex &&
        item.type === current.type
    );
    if (!duplicate) {
      return [...acc, current];
    }
    return acc;
  }, [] as any[]);

  const totalSlides = slides.length;

  const openEnvelop = () => {
    sendEditorData();
    router.push(`/envelop/${id}`);
  };

  return (
    <div className="card-carousel-container" id="main-carousle">
      <div className="editor_option" style={{ marginBottom: "15px" }}>
        <div>
          <button
            className="add_btn"
            onClick={handleAddMessageClick}
            disabled={showModal}
            style={{ padding: "10px", borderRadius: "50px" }}
          >
            Add Message
          </button>
        </div>
        <div className="search_input">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={showModal}
          />
          <div className={`upload_svg ${showModal ? "disabled" : ""}`}>
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
        <div className="search_input">
          <button
            onClick={() => openModal("GIF")}
            disabled={showModal}
            style={{ all: "unset", cursor: showModal ? "not-allowed" : "pointer" }}
          >
            <div className={`upload_svg ${showModal ? "disabled" : ""}`}>
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
          </button>
        </div>
        <div className="search_input" style={{ position: "relative" }}>
          <button
            onClick={toggleDropdown}
            style={{ all: "unset", cursor: showModal ? "not-allowed" : "pointer" }}
          >
            <div className={`upload_svg ${showModal ? "disabled" : ""}`}>
              <svg
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="MoreHorizIcon"
              >
                <path d="M6 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
              </svg>
            </div>
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                style={{ whiteSpace: "nowrap" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={showModal}
                />
                <div className={`upload_svg ${showModal ? "disabled" : ""}`}>
                  Add HandWriting
                </div>
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                style={{ whiteSpace: "nowrap" }}
                onClick={() => openModal("Sticker")}
              >
                Add Sticker
              </div>
            </div>
          )}
        </div>
        {id !== "fwzDVjvbQ_X" && (
          <div style={{ textAlign: "center" }}>
            <button className="add-btn" onClick={openEnvelop} disabled={showModal}>
              Preview
            </button>
          </div>
        )}
      </div>

      <div className="card-carousel">
        <div className="carousel-wrapper">
          <div className="carousel-slides">
            {slides.map((slide: any, index: number) => {
              let positionClass = "slide-hidden";
              if (index === activeSlideIndex) positionClass = "slide-active";
              else if (index === activeSlideIndex - 1) positionClass = "slide-prev";
              else if (index === activeSlideIndex - 2) positionClass = "slide-prev-2";
              else if (index === activeSlideIndex + 1) positionClass = "slide-next";
              else if (index === activeSlideIndex + 2) positionClass = "slide-next-2";

              return (
                <div
                  key={slide.id}
                  className={`carousel-slide ${positionClass}`}
                  onClick={() => handleSlideChange(index)}
                >
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
                    {positionClass === "slide-prev" && (
                      <>
                        <div className="slide-hover"></div>
                        <div
                          className="slide-button-overlay"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevSlide();
                          }}
                        >
                          <FaChevronLeft />
                        </div>
                      </>
                    )}
                    {positionClass === "slide-next" && (
                      <>
                        <div className="slide-hover"></div>
                        <div
                          className="slide-button-overlay"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextSlide();
                          }}
                        >
                          <FaChevronRight />
                        </div>
                      </>
                    )}
                    {index === activeSlideIndex && showModal && (
                      <TextEditor
                        onHide={closeModals}
                        setElements={setElements}
                        elements={elements}
                        selectedElement={selectedElement}
                        cardIndex={{ activeSlide: activeSlideIndex }}
                      />
                    )}
                  </div>
                  {index === activeSlideIndex &&
                    uniqueElements
                      .filter((el: any) => el.slideIndex === activeSlideIndex)
                      .map((el: any, i: number) => (
                        <DraggableElement
                          key={`${el.content}-${el.slideIndex}-${i}`}
                          content={el.content}
                          type={el.type}
                          index={{
                            original: elements.findIndex((e) => e === el),
                            activeSlide: activeSlideIndex,
                          }}
                          setElements={setElements}
                          elements={elements}
                          initialX={el.x || 0}
                          initialY={el.y || 0}
                          width={el.width || 320}
                          height={el.height || 200}
                          isDraggable={true}
                          color={el.color}
                          fontFamily={el.fontFamily}
                          fontSize={el.fontSize}
                          fontWeight={el.fontWeight}
                          activeSlide={activeSlideIndex}
                          setCurrentSlide={setCurrentSlide}
                          showImageModal={showImageModal}
                          setShowImageModal={setShowImageModal}
                          selectedElement={selectedElement}
                          setSelectedElement={setSelectedElement}
                          onImageClick={handleImageClick}
                          onDelete={handleDeleteElement}
                        />
                      ))}
                </div>
              );
            })}
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
                  style={{ width: `${((activeSlideIndex + 1) / totalSlides) * 100}%` }}
                ></div>
                <div
                  className="progress-dot"
                  style={{ left: `calc(${((activeSlideIndex + 1) / totalSlides) * 100}% - 7px)` }}
                ></div>
              </div>
            </div>
            <button className="carousel-arrow next" onClick={handleNextSlide}>
              ▶
            </button>
          </div>
          <div className="page-indicator">
            Page <b>{activeSlideIndex + 1}</b> of <b>{totalSlides}</b>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="p-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">Select a {type}</h2>
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder={`Search ${type}`}
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
                    width: 320,
                    height: 200,
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
  );
};

export default Custom;