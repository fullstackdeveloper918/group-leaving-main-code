
import React from 'react';
import Images from "../constants/images"
import Image from 'next/image';
interface OptionCardProps {
  title: string;
  imageSrc: any;
  description: string;
  buttonText: string;
  isFree?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, imageSrc, description, buttonText, isFree }) => {

  return (
    <div className="relative bg-white rounded-lg shadow-md w-full text-center hover:shadow-lg transition-shadow duration-300 cardBox">
      {isFree && (
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
          FREE
        </span>
      )}
      <Image src={imageSrc} alt={title} className="mx-auto mb-2  object-contain" width={60}  />
      <h3 className="md:text-xl tex-lg font-medium mb-2 mt-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="btnPrimary text-xs rounded-pill">{buttonText}</button>
    </div>
  );
};

export default OptionCard;
