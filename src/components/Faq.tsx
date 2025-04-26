import { useState } from 'react';
import FaqJson from "../constants/FaqJson/faq.json";
import Faqinputs from './common/Faqinputs';

type FAQItem = {
  question: string;
  answer: string;
};

const Faq = () => {
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Frequently Asked Questions</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div> */}
        <div className='faq_wrapper'> 
          {/* <h2 className="text-xl font-bold mb-3">General</h2> */}
          {FaqJson.general.map((item, index) => (
              <div key={index}>
          <Faqinputs items={item} index={index}/>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
