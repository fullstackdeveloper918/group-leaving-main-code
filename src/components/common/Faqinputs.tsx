"use client"
import React, { useState } from 'react'

const Faqinputs = ({index,items}:any) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    // <div className=''>
    <div key={index} className="border-b border-[#1118271a] mb-2  p-0 ">
    <button
      onClick={() => toggleFAQ(index)}
      className="w-full flex justify-between items-center py-3 focus:outline-none"
    >
      <span className="text-md text-[#111827] text-left max-w-[95%] font-medium text-gray-700">{items?.question}</span>
      <span className="text-2xl">{activeIndex === index ? '-' : '+'}</span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        activeIndex === index ? 'max-h-screen' : 'max-h-0'
      }`}
    >
      <div className="pb-3 text-gray-600">
        <p className='m-0 text-sm'>{items?.answer}</p>
      </div>
    </div>
    </div>
  // </div>
  )
}

export default Faqinputs