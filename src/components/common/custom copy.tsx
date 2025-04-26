"use client"
import React, { useState, useEffect,useCallback } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import "swiper/css";
// import "swiper/css/pagination";
import SlideImg_0 from "../../assets/images/slide0.png"
import SlideImg_1 from "../../assets/images/slide1.png"
import SlideImg_2 from "../../assets/images/slide2.png"
import SlideImg_3 from "../../assets/images/slide3.png"
import SlideImg_4 from "../../assets/images/slide4.png"
import SlideImg_5 from "../../assets/images/slide5.png"
import Modal from "react-modal";
import axios from "axios";
import nookies from "nookies";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import Quill from 'quill';
import Draggable from "react-draggable";
import { useParams, useRouter } from "next/navigation";
// import Draggable from 'react-draggable';
// import { Progress } from "../ui/progress";
interface Slide {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  link: string;
  card_img:any
}
interface UserInfo {
  name: string;
  email: string;
  uuid?: string;
}

const Custom: React.FC = () => {
  const router =useRouter()
  const params = useParams(); // Access the dynamic route params
  console.log(params,"kjhkjkjhk");
  
  const [id, setId] = useState<any>(null);
console.log(id,"flsjdfl");

useEffect(() => {
  if (params.id) {
    setId(params.id); // Set the dynamic id (B3729047)
    console.log("Extracted ID:", params.id); // Log the id
  }
}, [params]);
   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gifs, setGifs] = useState<string[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<any>(0);
  useEffect(() => {
    const cookies = nookies.get();
    console.log("cookiesUserInfo",cookies.userInfo);
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
console.log(userInfo?.uuid,"userInf");

  const [elements, setElements] = useState<any[]>([]);
  // console.log(elements,"elements");
  const sendEditorData = async () => {
    console.log(elements, "elementsasadsasasdas");
  
    let item = {
      editor_messages: elements,
      user_uuid: userInfo?.uuid,
      messages_unique_id:id
    };
  
    try {
      const response = await fetch("https://dating.goaideme.com/card/add-editor-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this header to specify JSON
        },
        body: JSON.stringify(item), // Convert the item object to JSON string
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload data");
      }
  
      const data = await response.json();
      console.log("Data uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };
  
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<string[]>([
    "https://groupleavingcards.com/assets/design/617318f94c962c605abdeabb.jpg",
    "https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif",
    "https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif",
    "https://groupleavingcards.com/assets/design/6734d2bbe8c991dba26a0288_sm.webp",
    "https://groupleavingcards.com/assets/design/66967675b0d2b479aa568c98_sm.avif",
    "https://groupleavingcards.com/assets/design/66d88499b4fb75024aa2d8de_sm.avif",
  ]);
console.log(elements,"elements");
const [slides, setSlides] = useState<Slide[]>([
  {
    id: "slide-1",
    title: "Development",
    subtitle: "SCSS Only Slider",
    text: "Learn to create a SCSS-only responsive slider.",
    link: "https://blog.significa.pt/css-only-slider-71727effff0b",
    card_img:SlideImg_0
    // card_img: "https://groupleavingcards.com/assets/design/617318f94c962c605abdeabb.jpg"
  },
  {
    id: "slide-2",
    title: "Web Design",
    subtitle: "Creative Animations",
    text: "Explore modern web design techniques.",
    link: "https://medium.com/web-design",
    card_img:SlideImg_1
    // card_img:"https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif"
  },
  {
    id: "slide-3",
    title: "JavaScript",
    subtitle: "Advanced ES6 Features",
    text: "Master JavaScript ES6+ features in depth.",
    link: "https://javascript.info/",
    card_img:SlideImg_2
    // card_img:"https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif"
  },
  {
    id: "slide-4",
    title: "React",
    subtitle: "State Management",
    text: "A guide to managing state effectively in React.",
    link: "https://reactjs.org/docs/hooks-intro.html",
    card_img:SlideImg_3
    // card_img: "https://groupleavingcards.com/assets/design/66967675b0d2b479aa568c98_sm.avif",
  },
  {
    id: "slide-5",
    title: "Next.js",
    subtitle: "Optimizing Performance",
    text: "Learn Next.js best practices for fast web apps.",
    link: "https://nextjs.org/docs/advanced-features",
    card_img:SlideImg_4
    // card_img:"https://groupleavingcards.com/assets/design/66d88499b4fb75024aa2d8de_sm.avif",
  },
]);
console.log(slides,"wertyuio");


  useEffect(() => {
    const storedElements:any = localStorage.getItem("slideElements");
    console.log(JSON.parse(storedElements),"sdafasd");
    
    if (storedElements) {
      setElements(JSON.parse(storedElements));
    }
  }, []);

  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("slideElements", JSON.stringify(elements));
    }
  }, [elements]);

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
      slideIndex: activeSlideIndex + 1,
      x: 0,
      y: 0,
      user_uuid:userInfo?.uuid
    };
console.log(activeSlideIndex,"activeSlideIndex");
console.log(newMessage,"newMessage");

    setElements([...elements, newMessage]);
    setShowModal(false);
    setEditorContent("");
    sendEditorData()
  };
 
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (activeSlideIndex !== null) {
  //         const newImage = {
  //           type: "image",
  //           content: reader.result as string,
  //           slideIndex: activeSlideIndex + 1,
  //           x: 0,
  //           y: 0,
  //         };

  //         setElements([...elements, newImage]);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file, "file");
    
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    try {
      // Prepare the form data to send the file as a payload
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("user_uuid", user_uuid:userInfo?.uuid);
  
      // Make the POST request with the form data (multipart/form-data)
      const response = await fetch("https://dating.goaideme.com/card/update-editor-messages", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
  
      const data = await response.json();
      console.log("Image uploaded successfully:", data);
  
      // Assuming the API responds with an object that includes the URL
      if (data) {
        const imageUrl = data.file;  // URL of the uploaded image
  
        if (file) {
          const reader = new FileReader();
  
          reader.onloadend = () => {
            if (activeSlideIndex !== null) {
              // Creating the object to store the image data
              const newImage = {
                type: "image",
                content: `https://dating.goaideme.com/${imageUrl}`,  // Use the URL from the API response
                slideIndex: activeSlideIndex + 1,  // Slide index for reference
                x: 0,  // Starting X position (can be updated as needed)
                y: 0,  // Starting Y position (can be updated as needed)
                user_uuid:userInfo?.uuid
              };
  
              // Add the new image object to the state
              console.log(newImage, "newImage");
              setElements((prevElements) => [...prevElements, newImage]);
            }
          };
          reader.readAsDataURL(file); // Converts image to base64 (if necessary for display)
        }
        sendEditorData()
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
      sendEditorData()
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
    // Create a new slide object (you can customize this as needed)
    const newSlide = {
      id: `slide-${slides.length + 1}`,  // Make sure the id is unique
      title: "New Slide",  // Customize the title
      subtitle: "New Subtitle",  // Customize the subtitle
      text: "This is a new slide",  // Customize the text
      link: "https://example.com",  // Customize the link
      card_img: "https://example.com/new-page-image.jpg",  // Customize the image URL
    };
  
    // Update the slides array by adding the new slide
    setSlides([...slides, newSlide]);
  };

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
      sendEditorData()
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

    for (let i = 0; i < images.length; i++) {
      const base64Image = await fetchImageAsBase64(images[i]);

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

      elements.forEach((el) => {
        if (el.slideIndex === i + 1) {
          pdf.setFontSize(10);
          pdf.setTextColor(255, 0, 0);
          pdf.text(
            `(${el.x}, ${el.y})`,
            10 + el.x,
            slideHeight / 2 + 40 + el.y
          );
        }
      });
    }

    pdf.save("slides_with_positions.pdf");
  };
  // const slides: Slide[] = [
  //   {
  //     id: "slide-1",
  //     title: "Development",
  //     subtitle: "SCSS Only Slider",
  //     text: "Learn to create a SCSS-only responsive slider.",
  //     link: "https://blog.significa.pt/css-only-slider-71727effff0b",
  //     card_img:"https://groupleavingcards.com/assets/design/617318f94c962c605abdeabb.jpg"
  //   },
  //   {
  //     id: "slide-2",
  //     title: "Web Design",
  //     subtitle: "Creative Animations",
  //     text: "Explore modern web design techniques.",
  //     link: "https://medium.com/web-design",
  //     card_img:"https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif"
  //   },
  //   {
  //     id: "slide-3",
  //     title: "JavaScript",
  //     subtitle: "Advanced ES6 Features",
  //     text: "Master JavaScript ES6+ features in depth.",
  //     link: "https://javascript.info/",
  //     card_img:"https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif"
  //   },
  //   {
  //     id: "slide-4",
  //     title: "React",
  //     subtitle: "State Management",
  //     text: "A guide to managing state effectively in React.",
  //     link: "https://reactjs.org/docs/hooks-intro.html",
  //     card_img: "https://groupleavingcards.com/assets/design/66967675b0d2b479aa568c98_sm.avif",
  //   },
  //   {
  //     id: "slide-5",
  //     title: "Next.js",
  //     subtitle: "Optimizing Performance",
  //     text: "Learn Next.js best practices for fast web apps.",
  //     link: "https://nextjs.org/docs/advanced-features",
  //     card_img:"https://groupleavingcards.com/assets/design/66d88499b4fb75024aa2d8de_sm.avif",
  //   },
  // ];

  const [activeSlide, setActiveSlide] = useState<number>(0); // Default to slide-3
  const totalSlides = slides.length;

  console.log(totalSlides, "totalSlides");
  const progress = ((activeSlide + 1) / totalSlides) * 100;

  const handleSlideChange = useCallback((index: number) => {
    console.log(index,"index")
    setActiveSlide(index);
    setActiveSlideIndex(index);
  }, []);

  console.log(activeSlide,activeSlideIndex, "progress");

  
  const openEnvelop=()=>{
    sendEditorData()
    router.push(`/envelop/${id}`)
  }
  return (
    <>
   
    <div style={styles.container}>

      <div className="editor_option mt-2 mb-5" >
        <button className="add_btn" onClick={openEnvelop}>

      Preview
        </button>
      </div>
      <div className="editor_option" style={{marginBottom:"15px"}} >
        <div>
          <button
            className="add_btn"
            onClick={handleAddMessageClick}
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
          />
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
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="GifIcon">
              <path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path>
            </svg>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleAddPage}
            className="px-4 py-2 add_btn border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
            style={{color:"white", marginLeft:"40px", borderRadius: "70px"}}
          >
            +
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
        <button  style={{
              padding: "10px",
              borderRadius: "50px",
            }}  className="add_btn" onClick={sendEditorData}> Save data</button>
        </div>
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


<section className="main-slider-section">
  
      {showModal && (
        <Draggable 
        axis="both" handle=".drag-handle">
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              minWidth: '300px',
              maxWidth: '500px',
              minHeight: '200px',
              maxHeight: '600px',
              overflow: 'auto',
              resize: 'horizontal'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drag-handle" style={{ cursor: 'move', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold' }}>
             Add Message
            </div>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              style={{ height: '200px', marginBottom: '20px', paddingBottom:'30px' }}
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'script': 'sub'}, { 'script': 'super' }],
                  [{ 'indent': '-1'}, { 'indent': '+1' }],
                  [{ 'align': [] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'font': [] }],
                  [{ 'size': [] }],
                  ['link', 'image', 'video'],
                  ['blockquote', 'code-block'],
                  ['clean']
                ],
              }}
            />

            <div className="flex gap-4 mt-5 items-center justify-center">
              <button
                onClick={() => setShowModal(false)}
                style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMessage}
                style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', borderRadius: '4px' }}
              >
                Save
              </button>
            </div>
          </div>
        </Draggable>
      )}
        <section className="section slider">
          {/* Radio Buttons */}
          {slides.map((slide, index) => (
            <input
            key={slide.id}
            type="radio"
            name="slider"
            id={slide.id}
            className="slider__radio"
            checked={activeSlideIndex === index}
            onChange={() => handleSlideChange(index)}
            />
          ))}

          {/* Slides */}
          <div className="slider__holder">
            {slides.map((slide, index) =>{


                console.log(activeSlideIndex , slide.id,"id gete")
          return(
              <>
                <label
                  key={slide.id}
                  htmlFor={slide.id}
                //   id="slider-item"
              
                  className={`slider__item slider__item--${index + 1} card`}
                >
                  {activeSlideIndex + 1 !== slide.id && <div className="hover-bg"></div>}
                  <div className="slider__item-content">
                  <img
                  src={slide.card_img.src}
                  alt={`slide-${index}`}
                  style={{ width: "450px", height: "550px", background: "white" }}
                />
                  </div>
                </label>

               
              </>
            )})}
             {elements
                  .filter((el) => el.slideIndex === activeSlideIndex + 1)
                  .map((el, i) => (
                    <DraggableElement
                      key={i}
                      content={el.content}
                      type={el.type}
                      index={i}
                      setElements={setElements}
                      initialX={el.x || 0}
                      initialY={el.y || 0}
                      // userId={}
                      isDraggable={true} // Disable dragging
                    />
                  ))}
          </div>
        </section>
        {/* Progress Bar */}
        <div className="space-y-2 progress-bar">
          {/* <Progress value={progress} className="h-2" /> */}
          <div className="page-no">
            Page {activeSlideIndex + 1} of {totalSlides}
          </div>
        </div>
      </section>

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
            className="px-4 py-2 bg-blue-600 text-black border rounded-md hover:bg-blue-700 transition" >       
            Search
          </button>
        </form>
        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96">
          {gifs.map((gifUrl, index) => (
            <img
              key={index}
              src={gifUrl}
              alt="GIF"
              style={{ width: "80%", height: "80%" }}
              className="rounded-lg cursor-pointer"
              onClick={() => {
                setElements((prev) => [
                  ...prev,
                  { type: "gif", content: gifUrl, slideIndex: activeSlideIndex + 1, x: 0, y: 0,user_uuid:userInfo?.uuid },
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

const DraggableElement = ({
  content,
  type,
  index,
  setElements,
  initialX,
  initialY,
  isDraggable = true, // Add a prop to control if dragging is enabled
}: {
  content: string;
  type: string;
  index: number;
  setElements: React.Dispatch<React.SetStateAction<any[]>>;
  initialX: number;
  initialY: number;
  isDraggable?: boolean; // Optional prop to disable dragging
}) => {
  const [{ x, y }, api] = useSpring(() => ({ x: initialX, y: initialY }));
  const [userInfo1, setUserInfo1] = useState<any>(null);

  useEffect(() => {
    const cookies = nookies.get();
    console.log("cookiesUserInfo", cookies.userInfo);
    const userInfoFromCookie: UserInfo | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo1(userInfoFromCookie);
  }, []);

  // Log when userInfo1 changes
  useEffect(() => {
    console.log(userInfo1, "userInfo1 updated");
  }, [userInfo1]);
  const bind = useDrag((state: any) => {

    if (!isDraggable) return; // If drag is disabled, do nothing
    const [newX, newY] = state.offset;

    api.start({ x: newX, y: newY });
console.log(userInfo1,"piopoi");

    setElements((prevElements) => {
      const updatedElements = [...prevElements];
      updatedElements[index] = {
        ...updatedElements[index],
        x: newX,
        y: newY,
        user_uuid:userInfo1?.uuid,
      };
      localStorage.setItem("slideElements", JSON.stringify(updatedElements));
      return updatedElements;
    });
  },
    { enabled: isDraggable }
);

  return (
<animated.div
  style={{
    x,
    y,
    position: "absolute",
    cursor: "move",
    zIndex: 10,
    color: "rgb(17, 17, 17)",
    left: "0px",
    right: "0px",
    top: "50%",
    width:"25%",
    transform: "translate3d(0px, 12px, 0px)",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }}
  {...bind()}
>
  {type === "image" || type === "gif" ? (
    <img
      src={content}
      alt="uploaded"
      style={{
        width: "100px",
        height: "100px",
        objectFit: "cover", // Ensure the image fits within the given space
        pointerEvents: "none", // This allows the drag event to go through the image
      }}
    />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  )}
</animated.div>

  );
};

const styles = {
  container: {
    overflow:"hidden",
    // padding: "20px",
    fontFamily: "Helvetica, Arial, sans-serif",
    // backgroundColor: "#eee",
    minHeight: "100vh",
    gap: "10px"
  } as React.CSSProperties,
  button: {
    margin: "10px",
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  } as React.CSSProperties,
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,
  modal: {
    background: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "600px",
  } as React.CSSProperties,
  swiperSlide: {
    textAlign: "center",
    fontSize: "18px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "600px",
    overflow: "hidden",
  } as React.CSSProperties,
  slideWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  } as React.CSSProperties,
};

export default Custom;