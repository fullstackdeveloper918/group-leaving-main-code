"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
// import { useDrag } from "@use-gFuel/react";
import "react-quill/dist/quill.snow.css";

import SlideImg_5 from "../../../../public/paper_grid.png";
import SlideImg_6 from "../../../../public/paper_grid.png";
import Modal from "react-modal";
import axios from "axios";
import nookies from "nookies";
import jsPDF from "jspdf";
import Draggable from "react-draggable";
import { Api } from "@/interfaces/interfaces";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import "quill-emoji/dist/quill-emoji.css";
import { Quill } from "react-quill";
import "quill-emoji";
import TextEditor from "./SingleTextEditor";
import { DraggableElement } from "./DraggableEditor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import Cookies from "js-cookie";
// import { useParams } from "next/navigation";
interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}

interface CommonCustomEditorProps {
  cardShareData: any;
  locked: boolean;
}

const CommonCustomEditor: React.FC<CommonCustomEditorProps> = ({
  cardShareData,
  locked,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const params = useParams();
  const [hasAddedFirstMessage, setHasAddedFirstMessage] = useState(false);
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
  const [data, setData] = useState<any[]>([]);
  const [shareImageData, setShareImageData] = useState<any>(null);
  const pathname = usePathname();
  const isEditorPath = /^\/share\/editor\/[^/]+$/.test(pathname);
  const searchParams = useSearchParams();
  // const [slides, setSlides] = useState<any[]>([]);
  const cardId = searchParams.get("cardId");
  const [first, second] = pathname.split("/").slice(1, 3);
  const basePath = `/${first}/${second}`;
  useEffect(() => {
    const fetchDataImage = async () => {
      try {
        if (!cardId) {
          console.log("Waiting for cardId...");
          return;
        }

        // Try to get from sessionStorage first
        const cachedImage = sessionStorage.getItem(`card_image_${cardId}`);
        if (cachedImage) {
          setShareImageData(cachedImage);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/edit-card/${cardId}`,
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const showImage = data?.data?.[0]?.images?.[0]?.card_images?.[0];

        if (showImage) {
          setShareImageData(showImage);
          // Store in sessionStorage
          sessionStorage.setItem(`card_image_${cardId}`, showImage);
        } else {
          console.warn("No image found in response");
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchDataImage();
  }, [cardId]);

  const id = params?.id;

  useEffect(() => {
    const cookies = nookies.get();
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);

  const gettoken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/users-cards`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );

        const data = await response.json();
        setShareImageData(data); // Store response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [gettoken]);

  useEffect(() => {
    const fetchEditorDatas = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/editor-messages/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            console.warn("Editor data not found for ID:", id);
          } else {
            console.error("Unexpected error from server:", response.status);
          }
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const apiElements = data?.editor_messages || [];
        setElements(apiElements);
        const maxIndex =
          apiElements.length > 0
            ? Math.max(...apiElements.map((el: any) => el.slideIndex || 0))
            : 0;
        const firstSlideImage = cardShareData?.images?.[0]?.card_images?.[0];

        // Wait for image to load
        if (!firstSlideImage) {
          console.warn("First slide image not yet available. Waiting...");
          return;
        }

        let filledSlides: any[] = [];

        // First slide with image
        filledSlides.push({
          id: `slide-1`,
          title: "New Slide",
          subtitle: "New Subtitle",
          text: "This is a dynamically generated slide.",
          link: "https://example.com",
          card_img: `${process.env.NEXT_PUBLIC_API_URL}/${
            cardId ? shareImageData : firstSlideImage
          }`,
        });

        for (let i = 1; i <= maxIndex; i++) {
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
        console.error("Error fetching editor data:", error);

        const firstSlideImage = cardShareData?.images?.[0]?.card_images?.[0];

        if (!firstSlideImage) {
          console.warn("First slide image not available even in catch.");
          setSlides([]);
          return;
        }

        const newSlides = [];
        newSlides.push({
          id: `slide-1`,
          title: "New Slide",
          subtitle: "New Subtitle",
          text: "This is a dynamically generated slide.",
          link: "https://example.com",
          card_img: `${process.env.NEXT_PUBLIC_API_URL}/${
            cardId ? shareImageData : firstSlideImage
          }`,
        });

        setSlides(newSlides);
        if (activeSlideIndex === 0) {
        }
      }
    };

    fetchEditorDatas();
  }, [cardShareData, id]);

  function cleanupSlides(slidesArr: any[], elementsArr: any[]) {
    const newSlides = [...slidesArr];
    let lastWithContent = newSlides.length - 1;
    for (; lastWithContent >= 0; lastWithContent--) {
      const hasContent = elementsArr.some((el: any) => {
        if (el.slideIndex >= newSlides.length) {
          const missingCount = el.slideIndex - newSlides.length + 1;
          for (let i = 0; i < missingCount; i++) {
            newSlides.push({
              id: `slide-${i + 1}`,
              title: "New Slide",
              subtitle: "New Subtitle",
              text: "This is a dynamically generated slide.",
              link: "https://example.com",
              card_img: SlideImg_6,
            });
          }
          return true;
        }

        // Normal check
        return el.slideIndex === lastWithContent;
      });

      if (hasContent) break;
    }
    if (lastWithContent < 0) {
      lastWithContent = 0;
    }
    const minSlides = 1;
    let newLength = Math.max(lastWithContent + 2, minSlides);
    return newSlides.slice(0, newLength);
  }

  useEffect(() => {
    if (elements?.length === 0) {
      return;
    }
    setSlides((prevSlides) => cleanupSlides(prevSlides, elements));
  }, [elements]);

  const handleAddPage = () => {
    setSlides((prevSlides) => {
      const newSlideIndex = prevSlides.length;
      const newSlide = {
        id: `slide-${newSlideIndex + 1}`,
        title: "New Slide",
        subtitle: "New Subtitle",
        text: "This is a dynamically generated slide.",
        link: "https://example.com",
        card_img: SlideImg_5,
      };

      // Create new array with all existing slides plus the new one
      const updatedSlides = [...prevSlides, newSlide];

      // Navigate to the new slide after state updates
      setTimeout(() => {
        setActiveSlideIndex(newSlideIndex);
        if (sliderRef.current) {
          sliderRef.current.value = newSlideIndex.toString();
        }
      }, 0);

      return updatedSlides;
    });
  };


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
    // return
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/card/add-editor-messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) throw new Error("Failed to upload data");
      const data = await response.json();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };


  // Update editor data on server
  const updateEditorData = async () => {
    const item = {
      editor_messages: elements,
      user_uuid: userInfo ? userInfo?.uuid : "",
      messages_unique_id: id,
    };

    // return
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/card/add-editor-messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) throw new Error("Failed to upload data");
      const data = await response.json();
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleAddMessageClick = () => {
    if (!hasAddedFirstMessage && activeSlideIndex === 0) {
      const newSlideIndex = slides.length;
      const newSlide = {
        id: `slide-${newSlideIndex + 1}`,
        title: "New Slide",
        subtitle: "New Subtitle",
        text: "This is a new slide",
        link: "https://example.com",
        card_img: SlideImg_5,
      };
      setSlides((prev) => [...prev, newSlide]);
      setHasAddedFirstMessage(true);
      setActiveSlideIndex(newSlideIndex);

      if (sliderRef.current) {
        sliderRef.current.value = newSlideIndex.toString();
      }
      setTimeout(() => {
        setShowModal(true);
      }, 150);

      return;
    }

    if (activeSlideIndex === 0 && !isEditorPath && slides.length > 1) {
      const lastSlideIndex = slides.length - 1;

      setActiveSlideIndex(lastSlideIndex);
      if (sliderRef.current) {
        sliderRef.current.value = lastSlideIndex.toString();
      }

      setTimeout(() => {
        setShowModal(true);
      }, 150);
      return;
    }

    setShowModal(true);
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      if (data?.file) {
        const imageUrl = data.file;
        const reader = new FileReader();
        reader.onloadend = () => {
          // FIXED: Always add to current slide, no redirects
          if (activeSlideIndex !== null) {
            const newImage = {
              type: "image",
              content: `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`,
              slideIndex: activeSlideIndex, // Use current slide
              x: 0,
              y: 0,
              width: 320,
              height: 200,
              user_uuid: userInfo?.uuid,
            };

            setElements((prevElements) => [...prevElements, newImage]);
            // REMOVED: No automatic slide switching
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
      const response = await axios.get(
        "https://tenor.googleapis.com/v2/search",
        {
          params: {
            q: term,
            key: "AIzaSyAPjx0xF2FgbpxJe60S-QdKvYozNrVyFGY",
            client_key: "test",
            limit: 100,
            locale: "en_US",
            media_filter: type === "Sticker" ? "minimal" : "gif",
            searchfilter: type === "Sticker" ? "sticker" : undefined,
          },
        }
      );
      const gifUrls = response.data.results.map((result: any) =>
        type === "Sticker"
          ? result.media_formats?.tinygif_transparent?.url ||
            result.media_formats?.gif?.url
          : result.media_formats.gif.url
      );
      // REMOVED: No automatic slide switching
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
    fetchGifs(
      modalType === "Sticker" ? "wave" : "trending",
      modalType as "GIF" | "Sticker"
    );
  };
  const handleSlideChange = (index: number) => {
    setActiveSlideIndex(index);
    if (sliderRef.current) sliderRef.current.value = index.toString();
    setSlides((prevSlides: any[]) => [...prevSlides]);
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) handleSlideChange(activeSlideIndex - 1);
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < slides.length - 1)
      handleSlideChange(activeSlideIndex + 1);
  };

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

  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const handleImageClick = (element: any, index: number) => {
    setSelectedElement({ ...element, originalIndex: index });
    setShowImageModal(true);
    setShowModal(false);
  };
  const handleDeleteElement = (index: number) => {
    setElements((prev) => prev.filter((_, i) => i !== index));
    closeModals();
  };

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
  useEffect(() => {
    if (showModal) {
      const textElement = elements.find(
        (el) => el.type === "text" && el.slideIndex === activeSlideIndex
      );
      setSelectedElement(textElement || null);
    }
  }, [activeSlideIndex, showModal, elements]);
  return (
    <>
      <div
        className="card-carousel-container select-none overflow-visible"
        id="main-carousle"
      >
        <div
          className="editor_option"
          style={{
            marginBottom: "15px",
            padding: "10px",
          }}
        >
          <div>
            <button
              className="add_btn add-message-btn font-montserrat"
              onClick={handleAddMessageClick}
              disabled={showModal}
              style={{
                padding: "10px",
                fontSize: "14px",
                borderRadius: "50px",
                boxShadow: "rgb(0 0 0 / 25%) 4px 4px 6px 1px",
                border: "1px solid transparent",
              }}
            >
              Add Your Message
            </button>
          </div>
          <div className="chooes-card flex gap-3 ">
          <div
            className="search_input"
            style={{
              padding: "10px",
              fontSize: "14px",
              borderRadius: "50px",
              boxShadow: "rgb(0 0 0 / 25%) 4px 4px 6px 1px",
              border: "1px solid transparent",
              cursor: "pointer",
            }}
          >
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
          <div
            className="search_input"
            style={{
              position: "relative",
              padding: "10px",
              borderRadius: "50px",
              boxShadow: "rgb(0 0 0 / 25%) 4px 4px 6px 1px",
              border: "1px solid transparent",
            }}
          >
            <button
              onClick={() => openModal("GIF")}
              disabled={showModal}
              style={{
                all: "unset",
                cursor: showModal ? "not-allowed" : "pointer",
              }}
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
          <div
            className="search_input"
            style={{
              position: "relative",
              padding: "10px",
              borderRadius: "50px",
              boxShadow: "rgb(0 0 0 / 25%) 4px 4px 6px 1px",
              border: "1px solid transparent",
            }}
          >
            <button
              onClick={toggleDropdown}
              disabled={showModal}
              style={{
                all: "unset",
                cursor: showModal ? "not-allowed" : "pointer",
              }}
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
              <div className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 click-model">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer txt-ed-field"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={showModal}
                  />
                  <div
                    className={`upload_svg bg-transparent ${
                      showModal ? "disabled" : ""
                    }`}
                  >
                    Add HandWriting
                  </div>
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer txt-ed-field"
                  style={{ whiteSpace: "nowrap" }}
                  onClick={() => openModal("Sticker")}
                >
                  Add Sticker
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className="bg-[#E0E9F2] font-extrabold text-blueBg p-2 rounded-full w-[40px] h-[40px]"
              onClick={handleAddPage}
              disabled={showModal}
              style={{
                padding: "10px",
                borderRadius: "50px",
                boxShadow: "rgb(0 0 0 / 25%) 4px 4px 6px 1px",
                border: "1px solid transparent",
              }}
              title="Add New Slide"
            >
              +
            </button>
          </div>

          </div>
        </div>

        <div className="card-carousel">
          <div className="carousel-wrapper">
            <div className="carousel-slides">
              {slides.map((slide: any, index: number) => {
                let positionClass = "slide-hidden";
                if (index === activeSlideIndex) positionClass = "slide-active";
                else if (index === activeSlideIndex - 1)
                  positionClass = "slide-prev";
                else if (index === activeSlideIndex - 2)
                  positionClass = "slide-prev-2";
                else if (index === activeSlideIndex + 1)
                  positionClass = "slide-next";
                else if (index === activeSlideIndex + 2)
                  positionClass = "slide-next-2";

                return (
                  <div
                    key={slide.id}
                    className={`carousel-slide ${positionClass} `}
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
                          Xposition={selectedElement?.x || 0}
                          Yposition={selectedElement?.y || 0}
                          slides={slides}
                          toast={toast}
                          user_uuid={cardShareData?.user_uuid}
                          activeSlideIndex={activeSlideIndex}
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
                            toast={toast}
                          />
                        ))}
                  </div>
                );
              })}
            </div>
            <div className="carousel-controls" style={{ zIndex: -1 }}>
              <button className="carousel-arrow prev" onClick={handlePrevSlide}>
                ◀
              </button>
              <div className="carousel-slider-container" style={{ zIndex: -1 }}>
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
                      }% - 5px)`,
                    }}
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
                      // slideIndex: activeSlideIndex,
                      slideIndex:
                        activeSlideIndex === 0
                          ? slides.length - 1
                          : activeSlideIndex,

                      x: 0,
                      y: 0,
                      width: 320,
                      height: 200,
                      user_uuid: userInfo?.uuid,
                    },
                  ]);
                  if (activeSlideIndex === 0) {
                    setActiveSlideIndex(slides.length - 2);
                  }
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

export default CommonCustomEditor;
