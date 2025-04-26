
import React from 'react'
import Images from "@/constants/images";
import Image from "next/image";
const Image_text_Card = () => {
  return (
    <div className=" bg-gray-100 container-fluid items-center mb-5 relative sectionSpace">
      <div className="shadow-md rounded-lg  column_gap grid lg:grid-cols-2  ">
        {/* Left Image Grid Section */}
        <div className="lg:mb-5 imgBottomBefore relative order_2">
          <div className="w-full  relative">
            <Image src={Images.laptop_img} alt='card'  className='object-cover rounded-[30px] w-100' />
             </div>
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col justify-center lg:mb-5 maxWidth order_1">
          <h1 className="mt-2 text-2xl  xl:text-3xl font-bold text-gray-900">The #1 rated group greeting card</h1>
          <ul className="space-y-3 text-gray-700 text-left paddingleft0 mxwidth33 pl-3">
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium mt-3 ">
            Unlimited messages on the card.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            100s of card covers to customize.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Add photos and GIFs to the card.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Download as a PDF to print.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Unlimited message length.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Invite friends and send reminders.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
            Your group does not need an account to sign.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium">
            No apps or downloads.
            </li>
            <li className="relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Can be signed by anyone worldwide.
            </li>
           
          </ul>
          {/* <div className="text-left mt-2"><a href="/create"><button className="btnthird px-4  py-2 border  border-[#a0ecef]">Get Started</button></a></div> */}
        </div>
     



     
         {/* left Text Section */}
         <div className="flex flex-col justify-center lg:my-5 imgBottomBefore relative list_group order_3">
          <h1 className="mt-2 text-2xl  xl:text-3xl font-bold text-gray-900">Need an eGift Card? Easy!</h1>
          <ul className="space-y-3 text-gray-700 paddingleft0 ">
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium mt-3  ">
            You choose who pays for the gift card. Let the company pay or let everyone chip in while they sign the card. Seamless!
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Collect a set amount, any amount or let people sign the card without contributing.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
          
              Add photos and GIFs to the card.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Your group does not see who contributed what.
            </li>
            <li className="  relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Choose from eGift Cards, hampers and flowers in our Gift Store.
            </li>
            <li className=" relative listBefore ml-4 md:text-lg lg:text-lg font-medium ">
            Give the GroupTogether AnyCard and let the recipient choose from 150+ eGift Cards.
            </li>
          </ul>
        </div>
        {/* right Image Grid Section */}
         <div className="lg:mt-5 order_4">
          <div className="w-full   ">
            <Image src={Images.top_2} alt='card'  className='object-cover rounded-[30px]' style={{ width: '100%', maxHeight:'600px'}}  />
             </div>
        </div> 

       
      </div>

    </div>
  )
}

export default Image_text_Card