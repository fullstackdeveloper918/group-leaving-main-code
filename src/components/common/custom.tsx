"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import SlideImg_0 from "../../assets/images/slide-new0.jpg";
import SlideImg_1 from "../../assets/images/slide-new1.jpg";
import SlideImg_2 from "../../assets/images/slide-new2.jpg";
import SlideImg_3 from "../../assets/images/slide-new3.jpg";
import SlideImg_4 from "../../assets/images/slide-new4.jpg";
import SlideImg_5 from "../../../public/paper_grid.png";
import SlideImg_6 from "../../../public/paper_grid.png";
import Modal from "react-modal";
import axios from "axios";
import nookies from "nookies";
import jsPDF from "jspdf";
import { useParams, usePathname, useRouter } from "next/navigation";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import "quill-emoji/dist/quill-emoji.css";
import "quill-emoji";
import TextEditor from "../editor/components/TextEditor";
import { DraggableElement } from "./DraggableElement";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [elements, setElements] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState<any>("");
  const sliderRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<string>("");
  const [slides, setSlides] = useState<any[]>([]);
  const [shareImageData, setShareImageData] = useState<any>(null);
  const pathname = usePathname();
  const isEditorPath = /^\/share\/editor\/[^/]+$/.test(pathname);

  const [first, second] = pathname.split("/").slice(1, 3);
  const basePath = `/${first}/${second}`;

  useEffect(() => {
    if (params.id) setId(params.id);
  }, [params]);

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
        setShareImageData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [gettoken]);
  const cardShareData = shareImageData?.listing?.find(
    (item: any) => item?.message_unique_id === params.id
  );

  useEffect(() => {
    if (basePath === "/share/editor" && cardShareData) {
      setSlides([
        {
          id: "slide-1",
          title: "Development",
          subtitle: "SCSS Only Slider",
          text: "Learn to create a SCSS-only responsive slider.",
          link: "...",
          card_img: `${process.env.NEXT_PUBLIC_API_URL}/${cardShareData.images?.[0]?.card_images?.[0]}`,
        },
      ]);
    }
  }, [basePath, cardShareData]);

  useEffect(() => {
    const fetchEditorData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/card/edit-messages-by-unique-id/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        const apiElements = data?.data?.[0]?.editor_messages || [];
        setElements(apiElements);
        const maxIndex =
          apiElements.length >= 0
            ? Math.max(...apiElements.map((el: any) => el.slideIndex || 0))
            : 0;
        let filledSlides = isEditorPath
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
          : [...initialSlides];

        if (maxIndex + 1 > filledSlides.length) {
          for (let i = filledSlides.length + 1; i >= maxIndex; i--) {
            filledSlides.push({
              id: `slide-${i + 1}`,
              title: "New Slide",
              subtitle: "New Subtitle",
              text: "This is a dynamically generated slide.",
              link: "https://example.com",
              card_img: SlideImg_5,
            });
          }
        }
        setSlides(filledSlides);
      } catch (error) {
        console.error("Error fetching editor data:", error);
        setElements([]);
        setSlides(isEditorPath ? [initialSlides[0]] : initialSlides);
      }
    };

    fetchEditorData();
  }, []);
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

        return el.slideIndex === lastWithContent;
      });

      if (hasContent) break;
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
      const updatedSlides = [...prevSlides, newSlide];
      setTimeout(() => {
        setActiveSlideIndex(newSlideIndex);
        if (sliderRef.current) {
          sliderRef.current.value = newSlideIndex.toString();
        }
      }, 0);
      return updatedSlides;
    });
  };

  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("slideElements", JSON.stringify(elements));
      updateEditorData();
    }
  }, [elements]);

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

  const updateEditorData = async () => {
    const item = {
      editor_messages: elements,
      user_uuid: userInfo ? userInfo?.uuid : "",
      messages_unique_id: id,
    };
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
    if (activeSlideIndex <= 4 && !isEditorPath) {
      const lastSlideIndex = slides.length - 2;
      const newSlide = {
        id: `slide-${slides.length + 1}`,
        title: "New Slide",
        subtitle: "New Subtitle",
        text: "This is a new slide",
        link: "https://example.com",
        card_img: SlideImg_5,
      };
      setActiveSlideIndex(lastSlideIndex);
      setShowModal(true);

      if (sliderRef.current) {
        sliderRef.current.value = lastSlideIndex.toString();
      }
      setShowModal(true);
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
          const targetIndex =
            activeSlideIndex === 0 ? slides.length - 2 : activeSlideIndex;

          if (activeSlideIndex !== null) {
            const newImage = {
              type: "image",
              content: `${process.env.NEXT_PUBLIC_API_URL}/${imageUrl}`,
              slideIndex: targetIndex,
              x: 0,
              y: 0,
              width: 320,
              height: 200,
              user_uuid: userInfo?.uuid,
            };

            setElements((prevElements) => [...prevElements, newImage]);
            if (activeSlideIndex === 0) {
              setActiveSlideIndex(slides.length - 2);
            }

            sendEditorData();
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
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
      if (activeSlideIndex === 0) {
        setActiveSlideIndex(slides.length - 2);
      }
      setGifs(gifUrls);
      setOpenDropdown(false);
    } catch (error) {
      console.error("Error fetching GIFs/Stickers:", error);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm) fetchGifs(searchTerm);
  };

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

  const openEnvelop = () => {
    sendEditorData();
    router.push(`/envelop/${id}`);
  };
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
      <div className="card-carousel-container select-none" id="main-carousle">
        <div className="editor_option" style={{ marginBottom: "15px" }}>
          <div
            className="editor_option"
            style={{
              marginBottom: "15px",
              padding: "10px",
            }}
          >
            <div>
              <button
                className="add_btn"
                data-tutorial="add-message"
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
                data-tutorial="upload-images"
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
              data-tutorial="gif-upload"
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
            <div data-tutorial="new-slide">
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
          {id !== "fwzDVjvbQ_X" && (
            <div style={{ textAlign: "center" }}>
              <button
                className="add-btn"
                onClick={openEnvelop}
                disabled={showModal}
              >
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
                            width={320}
                            height={200}
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
            <div data-tutorial="slide-navigation">
              <div className="carousel-controls">
                <button
                  className="carousel-arrow prev"
                  onClick={handlePrevSlide}
                >
                  ◀
                </button>
                <div className="carousel-slider-container">
                  <div className="progress-bar-container">
                    <div className="progress-track"></div>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          ((activeSlideIndex + 1) / totalSlides) * 100
                        }%`,
                      }}
                    ></div>
                    <div
                      className="progress-dot"
                      style={{
                        left: `calc(${
                          ((activeSlideIndex + 1) / totalSlides) * 100
                        }% - 7px)`,
                      }}
                    ></div>
                  </div>
                </div>
                <button
                  className="carousel-arrow next"
                  onClick={handleNextSlide}
                >
                  ▶
                </button>
              </div>
              <div className="page-indicator">
                Page <b>{activeSlideIndex + 1}</b> of <b>{totalSlides}</b>
              </div>
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

export default Custom;
