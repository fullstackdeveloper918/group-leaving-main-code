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
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

// Emoji support
import "quill-emoji/dist/quill-emoji.css";
import { Quill } from "react-quill";
import "quill-emoji";
import { toast } from "react-toastify";
import TextEditor from "../editor/components/TextEditor";
import { DraggableElement } from "./DraggableElement";
// import './MessageEditor.css';

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
  const [gifs, setGifs] = useState<string[]>([]);
  const [activeSlide, setActiveSlide] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  console.log(activeSlide, "activeSlide");
  // let slideIndex=activeSlide?3:0
  // console.log(slideIndex,"slideIndex");
  const [activeSlideIndex, setActiveSlideIndex] = useState<any>(0);
  useEffect(() => {
    const newIndex = activeSlide ? activeSlide : 0;
    setActiveSlideIndex(newIndex);
  }, [activeSlide]);
  const [elements, setElements] = useState<any[]>([]);
  const [editorContent, setEditorContent] = useState<any>("");
  const sliderRef = useRef<HTMLInputElement>(null);

  console.log(id, "popo");

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
  console.log(elements, "wertyui");

  const [slides, setSlides] = useState<any>([]);
  console.log(slides, "ouetouer");

  const pathname = usePathname();
  console.log(pathname, "pathname");
  const isEditorPath = /^\/share\/editor\/[^/]+$/.test(pathname);
  console.log(isEditorPath, "isEditorPath");

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
            {
              id: "slide-6",
              title: "new slide",
              subtitle: "new slide for new content",
              text: "new content",
              link: "https://nextjs.org/docs/advanced-features",
              card_img: SlideImg_6,
            },
          ] as any);

      // Create a new array of slides that includes placeholders if needed
      const filledSlides = [...initialSlides];

      for (let i = initialSlides.length; i <= maxIndex; i++) {
        filledSlides.push({
          id: `slide-${i + 1}`,
          title: "",
          // title: `Slide ${i + 1}`,
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
            {
              id: "slide-6",
              title: "new slide",
              subtitle: "new slide for new content",
              text: "new content",
              link: "https://nextjs.org/docs/advanced-features",
              card_img: SlideImg_6,
            },
          ] as any);

      // Create a new array of slides that includes placeholders if needed
      const filledSlides = [...initialSlides];
      setSlides(filledSlides);
    }
  }, []);

  console.log(showModal, "setShowModal12334");
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
      console.log("Data uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  const updateEditorData = async () => {
    const item = {
      editor_messages: elements,
      user_uuid: userInfo?.uuid,
      messages_unique_id: id,
    };

    try {
      const response = await fetch(
        "https://dating.goaideme.com/card/update-editor-messages",
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
      console.log("Data uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };


  const getEditorDaya = async () => {
    try {
      const response = await fetch(
        "https://dating.goaideme.com/card/edit-messages-by-unique-id/fwzDVjvbQ_X",
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
  

        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload data");
      }

      const data = await response.json();

      setElements(data?.data[0].editor_messages)
      console.log("Data uploaded successfully:", data?.data[0]);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  useEffect(()=>{
    getEditorDaya()
  },[])
  const handleAddMessageClick = () => {
    console.log(activeSlideIndex, "activeSlideIndex");
    if (activeSlideIndex < slides.length - 1) {
      const lastSlideIndex = slides.length - 1; // Get the last slide index

      // Update the active slide index to the last slide
      setActiveSlideIndex(lastSlideIndex);
      setShowModal(true);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    console.log(showModal, "12345678");
  }, [showModal]);

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
        "https://dating.goaideme.com/card/update-editor-messages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Image uploaded successfully:", data);

      if (data) {
        const imageUrl = data.file;

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            if (activeSlideIndex !== null) {
              const newImage = {
                type: "image",
                content: `https://dating.goaideme.com/${imageUrl}`,
                slideIndex: activeSlideIndex,
                x: 0,
                y: 0,
                width:0,
                height:0,
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

 const fetchGifs = async (term: string, type: 'GIF' | 'Sticker' = 'GIF') => {
  try {
    let response;

    if (type === 'Sticker') {
      response = await axios.get("https://tenor.googleapis.com/v2/search", {
        params: {
          q: term ,
          key: "AIzaSyAPjx0xF2FgbpxJe60S-QdKvYozNrVyFGY",
          client_key: "test",
          limit: 100,
          locale: "en_US",
          media_filter: "minimal", // minimal helps return transparent formats
          searchfilter: "sticker", // this helps target sticker results
          // pos: "CPQDEO66mIr6nY0DGh4KCgA_v8rXTNc_NUcSEIXT4_0Str_J-e5yHwAAAAAwMg",
        },
      });
    } else {
      response = await axios.get("https://tenor.googleapis.com/v2/search", {
        params: {
          q: term ,
          key: "AIzaSyAPjx0xF2FgbpxJe60S-QdKvYozNrVyFGY",
          client_key: "test",
          limit: 100,
          locale: "en_US",
          media_filter: "gif",
          // pos: "CNgEEO66mIr6nY0DGh4KCgA_v8gQLVsvC1oSEFIVaAvkb94bNrNiQgAAAAAwMg",
        },
      });
    }

    const gifUrls = response.data.results.map((result: any) => {
      const formats = result.media_formats;
      if (type === "Sticker") {
        return (
          formats?.tinygif_transparent?.url ||
          formats?.mediumgif_transparent?.url ||
          formats?.gif?.url
        );
      } else {
        return formats.gif.url;
      }
    });

    setGifs(gifUrls);
    sendEditorData();
    setOpenDropdown(false);
  } catch (error) {
    console.error("Error fetching GIFs/Stickers:", error);
  }
};



  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm) fetchGifs(searchTerm);
  };
const [type, setType]=useState<any>("")
  const openModal =(type: string) => {
    setIsOpen(true);
    setType(type)
   fetchGifs(type === "Sticker" ? "wave" : "trending", type as 'GIF' | 'Sticker'); 
  };

  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");
    console.log("slide length", slides.length);
    if (storedElements) {
      const parsedElements = JSON.parse(storedElements);
      parsedElements.forEach((element: any) => {
        console.log("Checking slideIndex:", element.slideIndex);
        // Check if the slideIndex matches slides.length
        if (slides.length - 1 === element.slideIndex) {
          console.log("Matched Element:", element);
          // Add a new slide
          handleAddPage();

        }
      });
    }
    // handleImageUpload()
  }, [elements]); // Watching slides.length and elements for changes
  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");
    console.log("slide length", slides.length);
    if (storedElements) {
      updateEditorData()
    }
  }, [elements]);
  // updateEditorData
  const handleAddPage = () => {
    const newSlide = {
      id: `slide-${slides.length}`,
      title: "New Slide",
      subtitle: "New Subtitle",
      text: "This is a new slide",
      link: "https://example.com",
      card_img: SlideImg_5,
    };
    setSlides((prevSlides: any[]) => [...prevSlides, newSlide]);

    // :white_tick: Active slide ko update mat kar, abhi same rehne de
    // toast.success(`New slide added`);
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
  console.log(activeSlideIndex, "handleAddPage11");

  const handleSlideChange = (index: number) => {
    // Store previous active index
    const prevActiveIndex = activeSlideIndex;
    console.log(index, "handleAddPage");
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

  const closeModals = () => {
    setShowModal(false);
  };

  const toggleDropdown = () => {
    // if (!showModal) {
      setOpenDropdown((prev) => !prev);
    // }
  };
  console.log(openDropdown,"openDropdown");
  console.log(elements,"openasdasdasaDropdown");
  
  return (
    <>
      <div className="card-carousel-container" id="main-carousle">
      <div className="editor_option" style={{ marginBottom: "15px" }}>
  <div>
    <button
      className="add_btn"
      onClick={handleAddMessageClick}
      disabled={showModal}
      style={{
        padding: "10px",
        borderRadius: "50px",
      }}
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
    <button onClick={() => openModal("GIF")} disabled={showModal} style={{ all: 'unset', cursor: showModal ? 'not-allowed' : 'pointer' }}>
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
        // disabled={showModal}
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
  <div className="absolute right-0 mt-2  bg-white border border-gray-200 rounded-md shadow-lg z-50">
 <div  className="px-4 py-2 hover:bg-gray-100 cursor-pointer" style={{whiteSpace:"nowrap"}}>
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
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer" style={{whiteSpace:"nowrap"}}
      onClick={() => openModal("Sticker")}
    >
    Add Sticker
    </div>
  </div>
)}

    </div>

  {id == "fwzDVjvbQ_X" ? (
    ""
  ) : (
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

                      {/* Conditionally render TextEditor on the last slide */}
                      {/* {index === activeSlideIndex && showModal && (
                        <TextEditor
                          onHide={closeModals}
                          setElements={setElements}
                          elements={elements}
                          selectedElement={null}
                          cardIndex={{ activeSlide: activeSlideIndex }}
                          
                        />
                      )} */}
                    </div>

                    {index === activeSlideIndex &&
                      elements
                        .filter((el) => el.slideIndex === activeSlideIndex)
                        .map((el, i) => {
                          const originalIndex = elements.findIndex((el) => el === el);
                          console.log(originalIndex,"originalIndex1234567");
                          
                          return (
                            ""
                            // <DraggableElement
                            //   // key={originalIndex}
                            //   key={el.id}
                            //   content={el.content}
                            //   type={el.type}
                            //   index={{
                            //     original: originalIndex,
                            //     activeSlide: activeSlideIndex,
                            //   }}
                            //   activeSlide={activeSlideIndex}
                            //   setCurrentSlide={setCurrentSlide}
                            //   setElements={setElements}
                            //   elements={elements}
                            //   initialX={el.x || 0}
                            //   initialY={el.y || 0}
                            //   width={el.width || 320}
                            //   height={el.height || 200}
                            //   isDraggable={true}
                            //   color={el.color}
                            //   fontFamily={el.fontFamily}
                            //   fontSize={el.fontSize}
                            //   fontWeight={el.fontWeight}
                            // />
                          );
                        })}
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
          className="p-4 bg-white rounded-lg shadow-lg max-w-xl mx-auto relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
          >
            &times;
          </button>
          <h2 className="text-lg font-bold mb-4">Select a {type}</h2>
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder= {`Search ${type}`}
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
                      width:0,
                height:0,
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

export default Custom;
