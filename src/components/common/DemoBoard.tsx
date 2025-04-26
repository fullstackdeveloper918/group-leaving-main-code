"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import DemoViewCard from './DemoViewCard'
import OptionCard from "@/components/OptionCard";
import Images from "../../constants/images";
import html2canvas from 'html2canvas'
import userIcon from "../../assets/icons/ab.png"
import Image from 'next/image';
const DemoBoard = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);

    const downloadBoard = async () => {
        // Capture the entire page content
        const element = document.documentElement; // This will capture the whole page
        
        // Target the specific div you want to exclude (using ref or className)
        const excludeElement = document.getElementById('excludeDiv');
        try {
            
            // Use html2canvas to take a screenshot of the entire page
            // const canvas = await html2canvas(element);
            const canvas = await html2canvas(element, {
              ignoreElements: (el) => el === excludeElement, // Ignore the exclude div
              useCORS: true, // Ensure cross-origin images are handled properly
              logging: true, // Enable logging to debug
          });
            const dataUrl = canvas.toDataURL('image/png'); // Get image in PNG format

            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'birthday_board.png'; // Set the file name
            link.click(); // Trigger the download
        } catch (error) {
            console.error("Error capturing the page: ", error);
        }
    };

  return (
   <>
   <section className="bg-demo_banner text-center demo_section common_padding bg-cover bg-no-repeat">
        {/* <ToastContainer/> */}
        <div className="container-fluid">
            
          <h1 className="text-md tracking-tight demo_heading">
          This is our demo board
          </h1>
          <p className="demo_paragraph text-grey ">
            You can test it out by adding messages, images and GIFs to see how
            it works. When you create a real card you will see more options to
            manage and customise your card.
          </p>
          <p>
            <b>Like what you see?</b> Create your own card to start collecting
            unlimited messages and pages all at a fixed cost.
          </p>
          <div className="demo_button_wrapper">
            <Link href={`/create`}>
              <button className=" btnPrimary">Create a Board</button>
            </Link>
            <Link href={`/demo/fwzDVjvbQ_X`}>
            <button className="btnSecondary ml-3">View Demo Card</button>
            </Link>
          </div>
        </div>
      </section>
      <section className=" justify-center items-center min-h-screen">

        
  <div className=" justify-center items-center w-full">
    <div className="flex flex-col items-center w-full ">
      <DemoViewCard downloadBoard={downloadBoard} />
    </div>
    <div className=" w-full md:mt-0 mt-5" style={{paddingLeft:"624px"}} id='excludeDiv'>
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-lg">
        <h3 className="text-center text-md font-normal">
          Gift Card Collection Pot
        </h3>
        <button className='text-center text-md font-normal' onClick={() => setIsModalOpen(true)}>
          <span className="">

          <Image src={userIcon} alt='user' />
          </span>
        </button>
        <img
          src="https://gift.wegift.io/static/product_assets/AMZ-GB/AMZ-GB-card.png"
          alt="Amazon"
          className="voucher_img mx-auto rounded"
        />
        <h4 className="font-bold text-center ">£0</h4>
        <button className="bg-greyBorder text-blackText rounded-lg w-100 text-sm p-2.5">
          Contribute to Hagrid Gift Card
        </button>
      </div>
      
    </div>
  </div>
</section>

<div className="bg-lightBg py-12">
      <div className="container-fluid ">
        <h1 className="xl:text-4xl md:text-xl sm:text-md font-semibold text-center">
          Create
        </h1>
        <h2 className="xl:text-2xl md:text-lg sm:text-sm font-semibold text-center mb-4">
          What would you like to create?
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-1   lg:grid-cols-3 md:gap-8 gap-4 lg:mt-5 justify-center">
          <Link href="/card/farewell" className="no-underline">
            <OptionCard
              title="Card"
              imageSrc={Images?.cards}
              description="It is like a regular greeting card but with unlimited pages, giving everyone plenty of space to share their thoughts and make it truly special."
              buttonText="Create Card"
            />
          </Link>
          <Link href={`/board`}  className="no-underline">
          <OptionCard
            title="Board"
            imageSrc={Images?.board}
            description="Boards function like a digital pinboard, allowing you to add unlimited messages and images on a scrollable page for endless creativity!"
            buttonText="Create Board"
            />
            </Link>
          <Link href={`/pool/new`} className="no-underline">
          <OptionCard
            title="Money Pool"
            imageSrc={Images?.money}
            description="
            Looking to gather cash for a special gift? This is your ideal solution! It's simple, convenient, and ensures your gift is just what they want."
            buttonText="Create Collection Pot"
            isFree={true}
            />
            </Link>
        </div>
      </div>
    </div>

    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Contributors
            </h2>
            <div className="flex gap-2 items-center mt-4  text-gray-800">
              <span>Looks like no one has contributed to this gift card yet.</span>
            </div>
            <hr className="border-t border-gray-300 mb-4" />
           
            <div className="flex gap-2 items-center mt-4 font-bold text-gray-800">
              <span>Total:</span>
              <span>£0.00</span>
            </div>
            {/* <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
   </>
  )
}

export default DemoBoard