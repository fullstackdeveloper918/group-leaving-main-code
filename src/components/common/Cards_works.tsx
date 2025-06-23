import React from "react";
import { Row, Col, Typography, Button, Card } from "antd";
import Images from "@/constants/images";
import Image from "next/image";

const { Title, Text } = Typography;
const Cards_works = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-24 items-center mt-5">
      {/* Step 1: Choose a Design */}
      <div className="text-center relative imgAfter">
        <div className="w-16 h-16 mx-auto mb-4">
          <Image
            src={Images.step_1}
            alt="card 1"
            className="w-full h-full object-cover "
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">Select a template</h3>
        <p className="text-gray-600 max-w-xs">
          Choose from our collection, personalize it with your friend's name and
          email, and set a delivery date.
        </p>
      </div>
      {/* Rectangle_303 */}
      {/* Step 2: Invite Others */}
      <div className="text-center imgAfter relative">
        <div className="w-16 h-16 mx-auto mb-4">
          <Image
            src={Images.step_2}
            alt="card 2"
            className="w-full h-full object-cover "
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Invite friends to contribute
        </h3>
        <p className="text-gray-600 max-w-xs">
          Send the link to friends and coworkers so they can add their messages
          and watch your group card fill up.
        </p>
      </div>

      {/* Step 3: Send the Card */}
      <div className="text-center imgAfter relative">
        <div className="w-16 h-16 mx-auto mb-4">
          <Image
            src={Images.step_3}
            alt="card 3"
            className="w-full h-full object-cover "
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">We'll deliver your card</h3>
        <p className="text-gray-600 max-w-xs">
          We'll email your group card on the date you choose, or you can
          download it as a PDF to print.
        </p>
      </div>
    </div>
  );
};

export default Cards_works;
