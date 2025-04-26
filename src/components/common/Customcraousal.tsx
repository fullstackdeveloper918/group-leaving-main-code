import React, { useEffect, useRef, useState } from 'react'
const Customcraousal = () => {
    useEffect(() => {
        const leftButton = document.querySelector(".nav-btn.left") as HTMLButtonElement;
        const rightButton = document.querySelector(".nav-btn.right") as HTMLButtonElement;
    
        const moveLeft = () => {
          const leftImage = document.querySelector(".left") as HTMLImageElement;
          const centerImage = document.querySelector(".center") as HTMLImageElement;
          const rightImage = document.querySelector(".right") as HTMLImageElement;
    
          if (leftImage && centerImage && rightImage) {
            leftImage.classList.remove("left");
            leftImage.classList.add("right");
            centerImage.classList.remove("center");
            centerImage.classList.add("left");
            rightImage.classList.remove("right");
            rightImage.classList.add("center");
          }
        };
    
        const moveRight = () => {
          const leftImage = document.querySelector(".left") as HTMLImageElement;
          const centerImage = document.querySelector(".center") as HTMLImageElement;
          const rightImage = document.querySelector(".right") as HTMLImageElement;
    
          if (leftImage && centerImage && rightImage) {
            leftImage.classList.remove("left");
            leftImage.classList.add("center");
            centerImage.classList.remove("center");
            centerImage.classList.add("right");
            rightImage.classList.remove("right");
            rightImage.classList.add("left");
          }
        };
    
        leftButton.addEventListener("click", moveLeft);
        rightButton.addEventListener("click", moveRight);
    
        return () => {
          leftButton.removeEventListener("click", moveLeft);
          rightButton.removeEventListener("click", moveRight);
        };
      }, []);
  return (
    <div className="carousel-container">
    <button className="nav-btn left" aria-label="Previous Page">
      &#9664;
    </button>

    <div className="image-container">
      <img
        src="https://groupleavingcards.com/assets/design/66bd382d51e4bce9bdd31fc6_sm.avif"
        alt="Left Image"
        className="carousel-image left"
      />
      <img
        src="https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif"
        alt="Center Image"
        className="carousel-image center"
      />
      <img
        src="https://groupleavingcards.com/assets/design/66e30136ffa5cb04d55d990e_sm.avif"
        alt="Right Image"
        className="carousel-image right"
      />
    </div>

    <button className="nav-btn right" aria-label="Next Page">
      &#9654;
    </button>
  </div>
  )
}

export default Customcraousal