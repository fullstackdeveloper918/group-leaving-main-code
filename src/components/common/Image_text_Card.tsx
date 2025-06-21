import React from 'react'
import Image from 'next/image';

const Image_text_Card = () => {
  return (
    <div className="bg-gray-100 container-fluid items-center mb-5 relative sectionSpace">
      <div className="shadow-md rounded-lg column_gap grid lg:grid-cols-2">

        {/* Left Image Grid Section */}
        <div className="lg:mb-5 imgBottomBefore relative order_2">
          <div className="w-full relative">
            <Image
            style={{height:"100%"}}
              src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f"
              alt="Digital Greeting Card"
              width={800}
              height={500}
              className="object-cover rounded-[30px] w-full"
            />
          </div>
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col justify-center lg:mb-5 maxWidth order_1">
          <h1 className="mt-2 text-2xl xl:text-3xl font-bold text-gray-900">
            Celebrate Together, Wherever You Are
          </h1>
          <ul className="space-y-3 text-gray-700 text-left paddingleft0 mxwidth33 pl-3">
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium mt-3">
              Personalize your group card with unlimited heartfelt messages.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Explore 100s of stunning card covers for any occasion.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Add photos, GIFs, and emojis to make it truly special.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Download as a high-quality PDF or share digitally.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              No message length limits — say as much as you want.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Send reminders and manage collaborators with ease.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              No sign-up needed for your friends — just click & sign!
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              100% browser-based — no apps, no installs.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Works across countries — sign from anywhere in the world.
            </li>
          </ul>
        </div>

        {/* Left Text Section (Gift Cards Info) */}
        <div className="flex flex-col justify-center lg:my-5 imgBottomBefore relative list_group order_3">
          <h1 className="mt-2 text-2xl xl:text-3xl font-bold text-gray-900">Add a Gift with Your Card</h1>
          <ul className="space-y-3 text-gray-700 paddingleft0">
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium mt-3">
              Let everyone chip in or choose to sponsor the gift yourself.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Collect any amount — or allow signing without payment.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Embed media and messages that bring joy.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              All contributions are private — only the organizer sees details.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Choose from eGift Cards, hampers, or curated flower bouquets.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
              Or let the recipient choose from over 150 eGift card options.
            </li>
          </ul>
        </div>

        {/* Right Image Grid Section */}
        <div className="lg:mt-5 order_4">
          <div className="w-full">
            <Image
              src="https://images.unsplash.com/photo-1544717305-996b815c338c"
              alt="Send eGift Cards"
              width={800}
              height={600}
              className="object-cover rounded-[30px] w-full"
              style={{ maxHeight: '600px' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Image_text_Card;
