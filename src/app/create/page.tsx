import OptionCard from "@/components/OptionCard";
import Link from "next/link";
import React from "react";
import Images from "../../constants/images";

const page = () => {
  return (
    <div className="bg-lightBg py-12">
      <div className="container-fluid ">
        <h1 className="xl:text-4xl md:text-xl sm:text-md font-semibold text-center">
          Start a Card
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
  );
};

export default page;
