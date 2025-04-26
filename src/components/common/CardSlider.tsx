import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Progress } from "../../components/ui/progress";
import Draggable from "react-draggable";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import nookies from "nookies";

interface SlideData {
  id: string;
  card_img: string;
  elements: { content: string; type: string; x: number; y: number }[];
}

const CardSlider: React.FC<any> = ({
  handleSaveMessage,
  slides,
  showModal,
  editorContent,
  setEditorContent,
  setShowModal,
  setActiveSlideIndex,
  activeSlideIndex,
}: any) => {
  const [elements, setElements] = useState<any>([]); // Keeps track of elements for the active slide
  const [parsedElements, setParsedElements] = useState<any>([]); // Store parsed elements from localStorage

  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const cookies = nookies.get();
    console.log("cookiesUserInfo",cookies.userInfo);
    const userInfoFromCookie: any | null = cookies.userInfo
      ? JSON.parse(cookies.userInfo)
      : null;
    setUserInfo(userInfoFromCookie);
  }, []);
  console.log(userInfo?.uuid, "userInfo?.uuid");
  const sendEditorData = async () => {
    console.log(elements, "elementsasadsasasdas");
  
    let item = {
      editor_messages: elements,
      user_uuid: userInfo?.uuid,
      // messages_unique_id:id
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

  useEffect(()=>{
    sendEditorData()
  },[elements])
  // Load elements from localStorage on component mount
  useEffect(() => {
    const storedElements = localStorage.getItem("slideElements");
    if (storedElements) {
      const parsed = JSON.parse(storedElements);
      console.log(parsed, "parsedElements"); // Logs the raw data from localStorage
      setParsedElements(parsed); // Save parsed elements in a separate state
    }
  }, []); 

  // Set elements for the active slide when activeSlideIndex changes
  useEffect(() => {
    if (parsedElements.length > 0) {
      const slideElements = parsedElements.filter((el: any) => el.slideIndex === activeSlideIndex);
      console.log(slideElements, "slideElements");
      setElements(slideElements); // Set filtered elements for the active slide
    }
  }, [activeSlideIndex, parsedElements]); 

  // Log elements for debugging after the state is updated
  useEffect(() => {
    console.log(elements, "Updated elements"); // Logs elements after state change
  }, []); 

  // Handle position change when a draggable element is moved
  // const handleDragStop = (e: any, data: any, elementIndex: number) => {

  //   console.log(e,data,elementIndex,"classes of checkus")
  //   const updatedElements = [...elements];
  //   updatedElements[elementIndex] = {
  //     ...updatedElements[elementIndex],
  //     x: data.x,
  //     y: data.y
  //   };
  //   setElements(updatedElements);
  
  //   // Optional: persist the updated elements
  //   localStorage.setItem("slideElements", JSON.stringify(updatedElements));
  // };
  
  const handleDragStop = (e: any, data: any, elementIndex: number) => {
    console.log(e, data, elementIndex, "classes of checkus");
  
    // Get the dragged element
    const draggedElement = elements[elementIndex];
  
    // Update the x and y position for the dragged element
    const updatedElement = {
      ...draggedElement,
      x: data.x,
      y: data.y,
    };
  
    // Update the elements state only for the dragged element
    const updatedElements = elements.map((el: any) =>
      el.slideIndex === draggedElement.slideIndex
        ? updatedElement
        : el // Keep other elements the same
    );
  
    // Update the state with the new elements array
    setElements(updatedElements);
  
    // Update localStorage only for the dragged element
    const updatedParsedElements = parsedElements.map((el: any) => {
      if (el.slideIndex === draggedElement.slideIndex) {
        // Update x and y position for the dragged element
        return {
          ...el,
          x: data.x,
          y: data.y,
        };
      }
      // Keep other elements the same
      return el;
    });
  
    // Save updated elements in localStorage
    localStorage.setItem("slideElements", JSON.stringify(updatedParsedElements));
  };
  
  const totalSlides = slides.length;
  const progress = ((activeSlideIndex + 1) / totalSlides) * 100;

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [activeSlideIndex, slides]);

  const handleSlideChange = (swiper: any) => {
    setActiveSlideIndex(swiper.realIndex);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  const handleDrag = (e: any, data: any, index: number) => {
    const updatedElements = [...elements];
    updatedElements[index] = {
      ...updatedElements[index],
      x: data.x,
      y: data.y,
    };
    setElements(updatedElements);
  };
  
  return (
    <div className="slider-container">
      {/* Previous Slide Click Area */}
      {!isBeginning && (
        <div className="prev-slide-click-area" onClick={() => swiperRef.current?.slidePrev()}>
          ◀
        </div>
      )}

      {/* Swiper Carousel */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        slidesPerView={1.5}
        centeredSlides={true}
        spaceBetween={0}
        onSlideChange={handleSlideChange} // Use the handler here
        className="custom-swiper"
      >
        
        {showModal && (
          <Draggable axis="both" handle=".drag-handle">
            <div
              style={{
                position: 'absolute',
                top: '25%',
                left: '16.5%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2000,
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                minWidth: '430px',
                maxWidth: '500px',
                minHeight: '200px',
                maxHeight: '350px',
                overflow: 'auto',
                resize: 'horizontal',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="drag-handle"
                style={{
                  cursor: 'move',
                  marginBottom: '10px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Add Message
              </div>
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                style={{ height: 'auto', marginBottom: '20px', paddingBottom: '30px' }}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ size: [] }],
                    ['link', 'image', 'video'],
                    ['blockquote', 'code-block'],
                    ['clean'],
                  ],
                }}
              />
              <div className="flex gap-4 mt-0 mb-2 items-center justify-center">
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

        {slides.map((slide: any, index: any) => (
          <SwiperSlide key={slide.id} className="custom-slide">
            <div className="hover-bg"></div>
            <div
              className={`slide-content ${index === activeSlideIndex ? 'active' : ''}`}
              id={!isBeginning ? 'margin-set' : undefined}
            >
              <img src={slide.card_img} alt={`Slide ${index}`} className="slide-image" />
              </div>
          </SwiperSlide>
        ))}
              {/* Draggable Elements */}
              {elements?.map((el: any, index: any) => (
                <Draggable
                  key={index}
                  axis="both"
                  defaultPosition={{ x: el.x, y: el.y }}
                  // onDrag={(e, data) => handleDrag(e, data, index)} // New function
                  onStop={(e, data) => handleDragStop(e, data, index)}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      cursor: 'move',
                    }}
                  >
                    {/* Display text or image based on the element type */}
                    {el.type === 'text'  && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.content,
                        }}
                        style={{
                          maxWidth: '200px', // Optional: Set a limit for text width
                          wordWrap: 'break-word',
                          cursor: 'move',  
                        }}
                      />
                    )}
                    {el.type === 'image'&& (
                      <img src={el.content} alt="element" style={{ maxWidth: '100%', maxHeight: '100px', cursor: 'move' }} />
                    )}
                    {el.type === "gif" && (
                      <img src={el.content} alt="element" style={{ maxWidth: '100%', maxHeight: '100px', cursor: 'move' }} />
                    )}
                  </div>
                </Draggable>
              ))}
          
      </Swiper>

      {/* Next Slide Click Area */}
      {!isEnd && (
        <div className="next-slide-click-area" onClick={() => swiperRef.current?.slideNext()}>
          ▶
        </div>
      )}

      {/* Page Indicator */}
      <div className="space-y-2 progress-bar">
        <div className="button-progress">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className={`prev-slide-icon ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            ◀
          </button>
          <Progress value={progress} className="h-2 w-full transition-all duration-300 ease-in-out" />
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className={`next-slide-icon ${isEnd ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            ▶
          </button>
        </div>
        <div className="page-no">
          Page {activeSlideIndex + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
