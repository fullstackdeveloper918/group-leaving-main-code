"use client"
import React, { useEffect } from 'react';

const ImageAnimation = () => {
  // Define inline styles as JavaScript objects
  const primaryColor = '#1e211d';
  const borderWidth = '5px';
  const borderType = 'solid';
  const borderImageMargin = '25px';

  const border = () => `${borderWidth} ${borderType} ${primaryColor}`;

  const imgHolderStyle = {
    position: 'relative',
    maxWidth: '80%',
    margin: '0 auto',
    display: 'inline-block',
    minWidth: '100px',
  }as any;

  const imgStyle = {
    width: '100%',
    height: '100%',
    float: 'left',
    opacity: 0,
    transform: 'scale(1)',
  }as any;

  const animateStyle = {
    animation: 'imageIn 0.5s ease',
    animationDelay: '1s',
    transition: 'opacity 0.1s, transform 0.75s',
    transitionDelay: '1s',
    transform: 'scale(1)',
    opacity: 1,
  };

  const beforeStyle = {
    content: "''",
    position: 'absolute',
    top: '0',
    height: '100%',
    background: primaryColor,
    zIndex: 1,
    animation: 'coverOut 0.5s ease',
    animationDelay: '1s',
    width: '0%',
    right: '0',
  };

  const borderStyleBefore = {
    content: "''",
    position: 'absolute',
    top: `-${borderImageMargin}`,
    right: borderImageMargin,
    borderTop: border(),
    borderRight: border(),
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 1,
    animation: 'borderIn 1s ease',
    boxSizing: 'border-box',
  }as any;

  const borderStyleAfter = {
    content: "''",
    position: 'absolute',
    left: `-${borderImageMargin}`,
    top: `-${borderImageMargin}`,
    borderBottom: border(),
    borderLeft: border(),
    height: '100%',
    width: '100%',
    zIndex: -1,
    opacity: 1,
    animation: 'borderInTwo 1s ease',
    boxSizing: 'border-box',
  }as any;

  useEffect(() => {
    const animateImages = () => {
      const images = document.querySelectorAll('.image-appear');
      images.forEach(image => {
        image.classList.add('animate');
      });
    };

    setTimeout(animateImages, 500);
  }, []);

  return (
    <div>
      {/* Inline styles for the image container */}
      <div className="img-holder image-appear" style={imgHolderStyle}>
        <span className="border" style={{ position: 'relative' }}>
          {/* Before and After Borders */}
          <span style={borderStyleBefore} />
          <span style={borderStyleAfter} />
        </span>
        <img
          src="https://images.unsplash.com/photo-1515864335-3bafcca4d9f5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e12bae8ebf41f93a02486b6512f5daa7&auto=format&fit=crop&w=300&q=80"
          alt="img"
          style={imgStyle}
        />
      </div>

      {/* Inline CSS for Animations */}
      <style>
        {`
          @keyframes borderIn {
            0% {
              top: 100%;
              height: 0%;
              width: 0%;
              border-top: none;
              border-right: none;
            }
            25% {
              top: -25px;
              height: 100%;
              width: 0%;
              border-right: solid ${borderWidth} ${primaryColor};
              border-top: solid ${borderWidth} ${primaryColor};
            }
            50% {
              top: -${borderImageMargin};
              height: 100%;
              width: 100%;
              border-right: solid ${borderWidth} ${primaryColor};
              border-top: solid ${borderWidth} ${primaryColor};
            }
            100% {
              top: -${borderImageMargin};
              height: 100%;
              width: 100%;
              border-right: solid ${borderWidth} ${primaryColor};
              border-top: solid ${borderWidth} ${primaryColor};
            }
          }

          @keyframes borderInTwo {
            0% {
              height: 0%;
              width: 0%;
              border-left: none;
              border-bottom: none;
            }
            50% {
              height: 0%;
              width: 0%;
              border-left: none;
              border-bottom: none;
            }
            75% {
              height: 100%;
              width: 0%;
              border-left: solid ${borderWidth} ${primaryColor};
              border-bottom: solid ${borderWidth} ${primaryColor};
            }
            100% {
              height: 100%;
              width: 100%;
              border-left: solid ${borderWidth} ${primaryColor};
              border-bottom: solid ${borderWidth} ${primaryColor};
            }
          }

          @keyframes coverOut {
            0% {
              width: 0%;
              right: 100%;
            }
            50% {
              width: 100%;
              right: 0%;
            }
            100% {
              width: 0%;
              right: 0%;
            }
          }

          @keyframes imageIn {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 0;
            }
            51% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ImageAnimation;
