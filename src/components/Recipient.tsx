import Image from "next/image";
import React from "react";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
import { Api } from "@/interfaces/interfaces";
import MultiStepForm from "./common/MultiStepForm";
const Recipient = async ({searchParams,params}: {searchParams: any;params: any;}) => {
  const api: Api = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/card/edit-card/${params?.id}`,
    method: "GET",
  };
  const data = await fetchFromServer(api);
  const showImage = data?.data[0].images[0]?.card_images[0];
 
  return (
    <div className="min-h-screen flex flex-wrap choose_section">
      {/* Left Part - Card Design */}
      <div className="md:w-1/2 flex-wrap w-2/2  bg-blue-50 flex items-center justify-center md:order-none order_1 bg-blueBg px-3 choose_card-wrapper">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-1 text-white">
            Start a Group Card
          </h1>
          <p className="text-[#d9d9d9] mb-6">
            Watering can {searchParams?.category} Greeting
          </p>

          {/* Card Image */}
          <div className="bg-white rounded-lg shadow-lg p-4 text-white">
            {data?.data ? (
              <span>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${showImage}`}
                  alt={`Card type: ${data?.data?.title}`}
                  className="rounded-lg object-cover"
                  height={300}
                  width={400}
                />
              </span>
            ) : (
              <p>No card found for this category and ID.</p>
            )}
          </div>
          <a
            href={`/card/${searchParams?.category}`}
            className="text-red-500 no-underline"
          >
            <p className="mt-6 text-red-500 text-md  text-white hover:underline">
              Select a Different Template
            </p>
          </a>
        </div>
      </div>
      <div className="md:w-1/2 w-full w-2/2 bg-lightBg flex flex-col items-center justify-center relative px-3 choose_content_wrapper">
        <MultiStepForm params={params?.id} />
      </div>
    </div>
  );
};

export default Recipient;
