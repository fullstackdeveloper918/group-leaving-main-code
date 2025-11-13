"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditorModal from "./common/EditorModal";
import DemoBoard from "./common/DemoBoard";
import Custom from "./common/custom";
import MySignatures from "./common/MySignatures";
import TutorialCard from "./common/TutorialCard";
import userIcon from "../assets/icons/abj.png";

interface Contributor {
  name: string;
  amount: number;
}

interface DemoCardProps {
  params: string;
}

const DemoCard: React.FC<DemoCardProps> = ({ params }) => {
  const [show, setShow] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showFirstTimePopup, setShowFirstTimePopup] = useState<boolean>(false);
  const [tutorialStep, setTutorialStep] = useState<number>(0);
  const [spotlightStyle, setSpotlightStyle] = useState<any>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const shareableLink = "https://groupwish.in/demo/fwzDVjvbQ_X";

  const contributors: Contributor[] = [
    { name: "Harry", amount: 100 },
    { name: "Hermione", amount: 50 },
    { name: "Anonymous", amount: 20 },
    { name: "Neville", amount: 80 },
    { name: "Draco", amount: 2 },
    { name: "Severus", amount: 8 },
    { name: "Minerva", amount: 100 },
  ];

  const totalAmount = contributors.reduce((sum, c) => sum + c.amount, 0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedDemoCard");
    if (!hasVisited) {
      setShowFirstTimePopup(true);
    }
  }, []);

  const scrollToElement = (element: Element) => {
    const rect = element.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + rect.top;
    const middle = absoluteTop - window.innerHeight / 2 + rect.height / 2;

    window.scrollTo({
      top: middle,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const calculateSpotlight = (selector: string) => {
      const button = document.querySelector(`[data-tutorial="${selector}"]`);
      if (button) {
        // Scroll to element first
        scrollToElement(button);

        // Wait for scroll to complete before calculating position
        setTimeout(() => {
          const rect = button.getBoundingClientRect();
          const absoluteTop = window.pageYOffset + rect.top;
          const absoluteLeft = window.pageXOffset + rect.left;

          setSpotlightStyle({
            top: absoluteTop - 10,
            left: absoluteLeft - 10,
            width: rect.width + 20,
            height: rect.height + 20,
          });
          setIsTransitioning(false);
        }, 500); // Wait for smooth scroll
      }
    };

    if (tutorialStep === 1) {
      setIsTransitioning(true);
      const timer = setTimeout(() => calculateSpotlight("add-message"), 100);
      return () => clearTimeout(timer);
    }

    if (tutorialStep === 2) {
      setIsTransitioning(true);
      const timer = setTimeout(
        () => calculateSpotlight("slide-navigation"),
        100
      );
      return () => clearTimeout(timer);
    }

    if (tutorialStep === 3) {
      setIsTransitioning(true);
      const timer = setTimeout(
        () => calculateSpotlight("Share-Gift-card"),
        100
      );
      return () => clearTimeout(timer);
    }

    if (tutorialStep === 4) {
      setIsTransitioning(true);
      const timer = setTimeout(() => calculateSpotlight("send-messages"), 100);
      return () => clearTimeout(timer);
    }

    if (tutorialStep === 0 || tutorialStep > 4) {
      setSpotlightStyle(null);
      setIsTransitioning(false);
    }
  }, [tutorialStep]);

  const handleModalClose = () => setIsModalVisible(false);
  const handleShare = () => setIsModalVisible(true);

  const handleFirstTimePopupClose = () => {
    setShowFirstTimePopup(false);
    setTutorialStep(0);
    sessionStorage.setItem("hasVisitedDemoCard", "true");
  };

  const handleTutorialNext = () => {
    setTutorialStep((prev) => {
      const next = prev + 1;
      if (next > 4) {
        setShowFirstTimePopup(false);
        sessionStorage.setItem("hasVisitedDemoCard", "true");
        return 0;
      }
      return next;
    });
  };

  const handleTutorialBack = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  const getTutorialContent = (step: number) => {
    switch (step) {
      case 1:
        return {
          text: "Click this button to add a message to the card. You can choose the message, font, size and position.",
          stepCount: "1/4",
        };
      case 2:
        return {
          text: "Navigate through different slides using these controls to view all messages on the card.",
          stepCount: "2/4",
        };
      case 3:
        return {
          text: "Contributors can chip in for a shared gift fund. Click here to add your contribution.",
          stepCount: "3/4",
        };
      case 4:
        return {
          text: "View and manage all messages sent to the card. You can see who has contributed and their messages.",
          stepCount: "4/4",
        };
      default:
        return { text: "", stepCount: "" };
    }
  };

  return (
    <>
      {params === "fwzDVjvbQ_X" ? (
        <>
          {/* Demo Banner Section */}
          <section className="bg-demo_banner text-center demo_section common_padding bg-cover bg-no-repeat">
            <div className="container-fluid">
              <h1 className="text-md tracking-tight demo_heading">
                Welcome to Your Interactive Demo
              </h1>
              <p className="demo_paragraph text-grey">
                Experience the card creation process firsthand! Add your own
                messages, upload images, and insert GIFs to explore all the
                features. When you create your own card, you'll unlock even more
                customization options and management tools.
              </p>
              <p>
                <b>Ready to make it yours?</b> Start your own card now and enjoy
                unlimited messages and pages for one simple price.
              </p>
              <div className="demo_button_wrapper">
                <Link href={`/create`}>
                  <button className="btnPrimary">Create Your Card</button>
                </Link>
                <Link href={`/demo/0cVkV16gHzX`}>
                  <button className="btnSecondary ml-3">View Demo Board</button>
                </Link>
              </div>
            </div>
          </section>

          <section className="greeting_card_sign common_padding">
            <div className="containers 2xl:max-w-[1200px] max-w-[1080px] mx-auto">
              <div className="lg:flex flex-col lg:flex-row">
                <div className="2xl:w-1/2 w-full lg:max-w-[600px] max-w-full">
                  {show ? <EditorModal /> : <Custom />}
                </div>
                <div className="2xl:w-1/2 w-full md:mt-0 mt-5 flex items-center justify-start flex-col 2xl:max-w-full lg:max-w-[400px] max-w-full mx-auto px-4">
                  <div
                    data-tutorial="send-messages"
                    className="w-full flex justify-center mb-4"
                  >
                    <MySignatures />
                  </div>
                  <div className="bg-white shadow-lg rounded-lg md:p-10 py-8 px-6 w-full max-w-lg flex flex-col gap-2 items-center">
                    <h3 className="text-center text-md font-normal">
                      Shared Gift Fund
                    </h3>
                    <button
                      className="text-center text-md font-normal relative"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <span className="absolute bottom-3 text-white rounded-full px-2 text-center usercount">
                        {contributors.length}
                      </span>
                      <span>
                        <Image src={userIcon} alt="user" />
                      </span>
                    </button>
                    <Image
                      src="https://gift.wegift.io/static/product_assets/AMZ-GB/AMZ-GB-card.png"
                      width={200}
                      height={200}
                      alt="Amazon"
                      className="voucher_img mx-auto rounded"
                    />
                    <h4 className="font-bold text-center">INR360</h4>
                    <button
                      data-tutorial="Share-Gift-card"
                      className="bg-greyBorder text-blackText rounded-lg w-100 text-sm p-2.5"
                    >
                      Chip in for Hagrid&apos;s Gift
                    </button>
                  </div>

                  <div className="w-full md:max-w-[500px] max-w-full">
                    <button
                      className="btnPrimary text-center w-100 mt-3 rounded-md"
                      onClick={handleShare}
                    >
                      Share Your Card
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Modal */}
            {isModalVisible && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                  <button
                    onClick={handleModalClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    X
                  </button>
                  <h3 className="text-lg font-semibold mb-2">
                    Share Your Card
                  </h3>
                  <p className="mb-4">
                    Share this URL with everyone who you want to be able to add
                    a message. They can add a message without signing up.
                  </p>
                  <input
                    value={shareableLink}
                    readOnly
                    className="w-full border rounded px-3 py-2 mb-4"
                  />
                  <div className="flex justify-center">
                    <Image
                      src="/qrcode-placeholder.png"
                      alt="QR Code"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </>
      ) : (
        <DemoBoard />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-40">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-5 focus:outline-none"
            >
              X
            </button>
            <h2 className="font-semibold mb-4">Contributors</h2>
            <ul className="p-0">
              {contributors.map((contributor, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{contributor.name}</span>
                  <span>£{contributor.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4 font-bold text-gray-800">
              <span>Total:</span>
              <span>£{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Step 0 - Welcome Modal */}
      {showFirstTimePopup && tutorialStep === 0 && (
        <div className="fixed inset-0 bg-[#000000]/20 z-50 transition-opacity duration-300">
          <div className="fixed inset-0 flex items-center justify-center z-[57]">
            <div className="pointer-events-auto">
              <TutorialCard
                onClose={handleFirstTimePopupClose}
                onSkip={handleFirstTimePopupClose}
                onNext={handleTutorialNext}
                currentStep={tutorialStep}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Steps 1-4 with Spotlight */}
      {showFirstTimePopup && tutorialStep >= 1 && tutorialStep <= 4 && (
        <>
          <div
            className="fixed inset-0 z-50 transition-opacity duration-300"
            style={{ pointerEvents: "none" }}
          />
          {spotlightStyle && !isTransitioning && (
            <>
              <div
                className="absolute z-[56] pointer-events-none transition-all duration-500 ease-in-out"
                style={{
                  top: `${spotlightStyle.top}px`,
                  left: `${spotlightStyle.left}px`,
                  width: `${spotlightStyle.width}px`,
                  height: `${spotlightStyle.height}px`,
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <div
                className="absolute bg-white rounded-lg shadow-xl p-4 max-w-xs z-[57] transition-all duration-500 ease-in-out"
                style={{
                  top:
                    tutorialStep === 1 || tutorialStep === 4
                      ? `${spotlightStyle.top + spotlightStyle.height + 20}px`
                      : `${spotlightStyle.top + spotlightStyle.height - 240}px`,
                  left: `${Math.max(
                    20,
                    Math.min(spotlightStyle.left, window.innerWidth - 340)
                  )}px`,
                }}
              >
                <p className="text-sm text-gray-700 mb-3">
                  {getTutorialContent(tutorialStep).text}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {tutorialStep > 1 && (
                      <button
                        onClick={handleTutorialBack}
                        className="bg-[#5696DB] hover:bg-[#4580c5] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleFirstTimePopupClose}
                      className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                  <button
                    onClick={handleTutorialNext}
                    className="bg-[#5696DB] hover:bg-[#4580c5] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {tutorialStep === 4
                      ? "Finish"
                      : `Next (${getTutorialContent(tutorialStep).stepCount})`}
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DemoCard;
