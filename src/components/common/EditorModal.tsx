"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Transformer,
  Text as KonvaText,
  Image ,
  Rect,
} from "react-konva";
// import { useNavigate } from "react-router-dom";

const TENOR_API_KEY = "AIzaSyDtjlCWbN7dRP6RUgfgbnzDtmSaK65zaBU";

// Define types for images, gifs, and stickers
interface ImageProps {
  x: number;
  y: number;
  width: number;
  height: number;
  src: any;
  id: string;
  rotation?: number;
  type: "image" | "gif" | "sticker";
}

const ImageComponent: React.FC<{
  shapeProps: ImageProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ImageProps) => void;
}> = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = shapeProps.src; // Load the image from the provided src
    img.onload = () => {
      setImageObj(img); // Set the image to state when it is loaded
    };
  }, [shapeProps.src]);

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current!]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e: any) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = (e: any) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale
    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...shapeProps,
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(), // Get rotation angle
    });
  };

  return (
    <>
      {isSelected && (
        <Rect
          x={shapeProps.x}
          y={shapeProps.y}
          width={shapeProps.width}
          height={shapeProps.height}
          stroke="blue"
          strokeWidth={4}
          listening={false}
        />
      )}
      {imageObj && (
        <KonvaImage
          ref={shapeRef}
          image={imageObj} // Pass the loaded image
          {...shapeProps}
          draggable
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={handleDragEnd}
          onTransformEnd={handleTransformEnd}
        />
      )}
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox: any, newBox: any) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const EditorModal = ({showCard}:any) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [thumbnails, setThumbnails] = useState<{ id: string; src: string }[]>(
    []
  );
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [texts, setTexts] = useState<
    {
      id: string;
      text: string;
      x: number;
      y: number;
      fontSize: number;
      fontFamily: string;
      fill: string;
    }[]
  >([]);
  console.log(texts,"texts");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gifs, setGifs] = useState<string[]>([]); // State to store GIF URLs
  const [stickers, setStickers] = useState<string[]>([]); // State to store Sticker URLs
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to store search term for Tenor API
  const [currentText, setCurrentText] = useState<string>("");
  const [textStyles, setTextStyles] = useState({
    fontSize: 20,
    fontFamily: "Arial",
    color: "black",
  });
  const [isAddingText, setIsAddingText] = useState(false); // Added state for text addition mode
  // const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // Fetch GIFs from Tenor based on the search term
  const handleButtonClick = () => {
    openModal(); // Open modal
    setIsAddingText(true); // Set text adding to true
  };

  // Handle image, GIF, and sticker uploads
  const handleMediaUpload = (
    files: FileList,
    type: "image" | "gif" | "sticker"
  ) => {
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new window.Image();
          img.src = reader.result as string;
          img.onload = () => {
            const newId = `${type}${thumbnails.length + 1}`;
            setThumbnails((prev) => [...prev, { id: newId, src: img.src }]);

            const newMedia: ImageProps = {
              x: 100,
              y: 100,
              width: 200,
              height: 200,
              src: img.src,
              id: newId,
              type: type,
              rotation: 0,
            };

            setImages((prevImages) => [...prevImages, newMedia]);
          };
        };
        reader.readAsDataURL(file);
      });
    }
  };


  // Handle adding text to the canvas
  const handleAddText = () => {
    const newText = {
      id: `text${texts.length + 1}`,
      text: currentText,
      x: 100, // Initial position
      y: 100, // Initial position
      fontSize: textStyles.fontSize,
      fontFamily: textStyles.fontFamily,
      fill: textStyles.color,
    };
    setTexts((prevTexts) => [...prevTexts, newText]);
    setCurrentText(""); // Clear the input field
    setIsAddingText(false); // Exit text adding mode
    closeModal()
  };


  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    setTextStyles((prevStyles) => ({
      ...prevStyles,
      fontSize: size,
    }));
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextStyles((prevStyles) => ({
      ...prevStyles,
      fontFamily: e.target.value,
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextStyles((prevStyles) => ({
      ...prevStyles,
      color: e.target.value,
    }));
  };
  const [imageBlob, setImageBlob] = useState<any>(null);
  const stageRef = useRef<any>(null);
  console.log(imageBlob,"imageBlob");
  console.log(stageRef,"stageRef");
  
  const handleDownloadClick = () => {
    if (stageRef.current) {
      // Capture the current stage as a base64-encoded PNG image
      const uri = stageRef.current.toDataURL();

      // Convert the base64 string to a Blob
      fetch(uri)
        .then((res) => res.blob()) // Convert to Blob
        .then((blob) => {
          // Create a Blob URL
          const blobUrl = URL.createObjectURL(blob);
          console.log(blobUrl,"blobUrl");
          const newBlobUrl = URL.createObjectURL(blob);
          localStorage.setItem('imageBlobUrl', newBlobUrl);
          console.log(newBlobUrl,"newBlobUrl");
          // Store the Blob URL in state
          setImageBlob(blobUrl);

          // Create a temporary download link and trigger the download
          const link = document.createElement("a");
          link.href = blobUrl; // Use the Blob URL for the download
          link.download = "Demo.png"; // Set the download filename
          link.click();

          // Optionally, revoke the Blob URL after the download
          URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => {
          console.error("Error generating Blob:", error);
        });
    }
  };

  const [gifUrls, setGifUrls] = useState<string[]>([]); // State to hold array of GIF URLs
  // const [selectedGif, setSelectedGif] = useState<string>(''); // State to hold selected GIF URL
  const [selectedGif, setSelectedGif] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [searchTerm1, setSearchTerm1] = useState<string>(''); // Default search term
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Modal visibility state
  const [error, setError] = useState<string>(''); // State to handle errors
console.log(selectedGif,"selectedGif");

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm1(event.target.value);
  };

  // Function to fetch GIFs based on search term
  const fetchGifs = async () => {
    setLoading(true); // Start loading
    setError(''); // Reset error state
    setGifUrls([]); // Clear previous GIFs
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=LPhD6fIpl4nHpcOFAyvDapGDe679OZ5B&q=${searchTerm1}&limit=100&rating=g`
      );
      const data = await response.json();
      if (data.data.length > 0) {
        setGifUrls(data.data.map((gif: any) => gif.images.original.url)); // Set URLs of 10 GIFs
      } else {
        setError('No GIFs found for your search.'); // Handle no results
      }
    } catch (error) {
      console.error('Error fetching GIFs', error);
      setError('Failed to fetch GIFs. Please try again later.'); // Handle fetch error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch GIFs when the component mounts or when searchTerm changes
  useEffect(() => {
    fetchGifs();
  }, [searchTerm1]); // Dependency array ensures this runs when searchTerm changes

  // Function to open the modal
  const openModal1 = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal1 = () => {
    setModalOpen(false);
  };

  // Function to handle GIF selection
  const handleGifSelect = (gifUrl: string) => {
    // setSelectedGif(gifUrl); // Save the selected GIF to the state
    setSelectedGif(prevSelectedGifs => [...prevSelectedGifs, gifUrl]);
    closeModal1(); // Close the modal after selection
  };
  const [gifImages, setGifImages] = useState<any>([]);
console.log(gifImages,"gifImages");

  // Load GIFs as Konva Image nodes (HTMLImageElement objects)
  useEffect(() => {
    // Function to load GIF URL into an HTMLImageElement
    const loadImage = (gifUrl: string) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.src = gifUrl;
        img.onload = () => resolve(img); // Resolve with the loaded image
        img.onerror = (error) => reject(error); // Handle error
      });
    };

    // Load all selected GIFs
    const loadGifImages = async () => {
      try {
        const loadedImages = await Promise.all(selectedGif.map(loadImage));
        setGifImages(loadedImages);
      } catch (error) {
        console.error('Error loading GIFs:', error);
      }
    };

    loadGifImages();
  }, [selectedGif]); 


  console.log(images,"images");
  
  return (
    <div className="editor_app">
      {/* Left Section (Editor Canvas) */}

      {/* Right Section (Options and Thumbnails) */}
      <div className="editor_option">
      <div>
          <button
          className="add_btn"
            onClick={handleButtonClick}
            style={{
              padding: "10px",
              // backgroundColor: "#28a745",
              // color: "white",
              border: "none",
              borderRadius: "50px",
            }}
          >
            Add Message
          </button>

        
        </div>
        {/* Image Upload */}
        <div className="search_input">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleMediaUpload(e.target.files!, "image")}
            multiple
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
        <div className="search_input">
          <input
            type="file"
            accept="image/*"
            // onChange={(e) => handleMediaUpload(e.target.files!, "image")}
            multiple
          />
          <div className="upload_svg">
          <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="GifIcon"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></svg>
          </div>
        </div>
        <div>
    
    </div>
        {/* GIFs and Stickers Search */}
        {/* <div className="text_design">
         
           <input
        type="text"
        value={searchTerm1}
        onChange={handleSearchChange}
        placeholder="Search for a GIF"
        style={{ padding: '10px', margin: '10px 0' }}
      />
      <button onClick={openModal1} style={{ padding: '10px' }}>
        Search
      </button>

  

        </div> */}

       

        {/* Add Text Section */}
        {/* <div>
          <button
            onClick={handleButtonClick}
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Text
          </button>

        
        </div> */}

        {/* Add to Cart Button */}
      
        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleDownloadClick}
            className="add_btn"

              style={{
              // padding: "10px 20px",
              // backgroundColor: "#007bff",
              // color: "white",
              // border: "none",
              borderRadius: "40px",
            }}
          >
           Download
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={showCard}
            className="add_btn"

              style={{
                // padding: "10px 20px",
                // backgroundColor: "#007bff",
                // color: "white",
                // border: "none",
                borderRadius: "40px",
              }}
          >
           Show Card
          </button>
        </div>
      </div>

      <div className="editoe_tab">
        <Stage width={1230} height={600} ref={stageRef}>
          <Layer>
            {images.map((image) => (
              <ImageComponent
                key={image.id}
                shapeProps={image}
                isSelected={image.id === selectedImageId}
                onSelect={() => setSelectedImageId(image.id)}
                onChange={(newAttrs) => {
                  setImages((prevImages) =>
                    prevImages.map((img) =>
                      img.id === image.id ? { ...img, ...newAttrs } : img
                    )
                  );
                }}
              />
            ))}
            {texts.map((text) => (
              <KonvaText
                key={text.id}
                text={text.text}
                x={text.x}
                y={text.y}
                fontSize={text.fontSize}
                fontFamily={text.fontFamily}
                fill={text.fill}
                draggable
                onDragEnd={(e) => {
                  setTexts((prevTexts) =>
                    prevTexts.map((t) =>
                      t.id === text.id
                        ? { ...t, x: e.target.x(), y: e.target.y() }
                        : t
                    )
                  );
                }}
              />
            ))}
  {/* {gifImages.map((image:any) => (
              <ImageComponent
                key={image.id}
                shapeProps={image}
                isSelected={image.id === selectedImageId}
                onSelect={() => setSelectedImageId(image.id)}
                onChange={(newAttrs) => {
                  setGifImages((prevImages:any) =>
                    prevImages.map((img:any) =>
                      img.id === image.id ? { ...img, ...newAttrs } : img
                    )
                  );
                }}
              />
            ))} */}
            {/* {gifImages.map((gif, index) => (
            <KonvaImage
              key={index}
              image={gif}  // Pass the loaded image here
              x={index * 120}  // Example: position the GIFs in a row
              y={50}  // Example: vertical position
              width={100}
              height={100}
            />
          ))} */}
            
          </Layer>
        </Stage>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full relative">
            {/* Top-left Cancel Button */}
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Add to Gift Card
            </h2>

            <button
              className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none"
              onClick={closeModal}
            >
              X
            </button>

            {/* Form Controls */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="w-full mr-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={textStyles.fontSize}
                    onChange={handleFontSizeChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{ maxWidth: "100px" }}
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family:
                  </label>
                  <select
                    value={textStyles.fontFamily}
                    onChange={handleFontFamilyChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color:
                  </label>
                  <input
                    type="color"
                    value={textStyles.color}
                    onChange={handleColorChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                    style={{ maxWidth: "60px" }}
                  />
                </div>
              </div>

              {/* Text Input and Add Button */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="textarea"
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                  placeholder="Enter text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="modal-btn">

                <button
                  onClick={handleAddText}
                  className="bg-green-500 text-white bg-blueBg d-hide-btn px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Add Text
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* {imageBlob && (
        <>
          <div>Blob URL: {imageBlob}</div>
          <img src={imageBlob} alt="Generated Image" style={{ width: "300px", height: "auto" }} />
        </>
      )} */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '80%',
              maxHeight: '80%',
              overflowY: 'scroll',
            }}
          >
            <button
              onClick={closeModal1}
              style={{
                marginBottom: '20px',
                padding: '8px 16px',
                backgroundColor: '#ff6347',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
            <h2>Search Results</h2>
            {loading ? (
              <p>Loading GIFs...</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '10px',
                }}
              >
                {gifUrls.map((gifUrl, index) => (
                  <div
                    key={index}
                    onClick={() => handleGifSelect(gifUrl)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={gifUrl}
                      alt={`GIF ${index}`}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
    
  );
};

export default EditorModal;
