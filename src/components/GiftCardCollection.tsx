// components/GiftCardCollection.tsx
import React from "react";

const GiftCardCollection: React.FC = () => {
  return (
    <div className="bg-pink-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Shared Gift Funds</h2>
        <p className="text-lg mb-8">
          Add a group collection pot to all our group cards to pool money for a
          gift card.
        </p>

        {/* Image section */}
        <div className="flex justify-center space-x-4 mb-12">
          <img src="/amazon-card.png" alt="Amazon gift card" className="w-24" />
          <img
            src="/deliveroo-card.png"
            alt="Deliveroo gift card"
            className="w-24"
          />
          <img
            src="/naked-wines-card.png"
            alt="Naked Wines gift card"
            className="w-24"
          />
          <img
            src="/john-lewis-card.png"
            alt="John Lewis gift card"
            className="w-24"
          />
        </div>

        {/* How it works section */}
        <h3 className="text-2xl font-semibold mb-6">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-lg">
              <span className="text-4xl font-bold text-purple-500">1</span>
              <h4 className="text-xl font-semibold mb-6">Add a gift card</h4>
              <p>Create a cash collection pot and pick a gift card.</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-lg">
              <span className="text-4xl font-bold text-purple-500">2</span>
              <h4 className="text-xl font-semibold mb-6">
                Gather contributions
              </h4>
              <p>Everyone is welcome to contribute to the pot.</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-lg">
              <span className="text-4xl font-bold text-purple-500">3</span>
              <h4 className="text-xl font-semibold mb-6">Send your thanks</h4>
              <p>The recipient will get their gift card by email.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardCollection;
