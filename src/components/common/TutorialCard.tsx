import React from 'react';
import { X } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  targetElement?: string;
}

interface TutorialCardProps {
  onClose: () => void;
  onSkip: () => void;
  onNext: (step: number) => void;
  currentStep: number;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ onClose, onSkip, onNext, currentStep }) => {
  const steps: TutorialStep[] = [
    {
      title: "Tutorial - Signing a Card",
      description: "This is the share page where you can sign the card. Follow this tutorial to learn how to sign a card or click skip if you know what you're doing already.",
    },
    {
      title: "Step 1: Add a Message",
      description: "Click this button to add a message to the card. You can choose the message, font, size and position.",
      targetElement: "add-message",
    },
    {
      title: "Step 2: Slide Navigation",
      description: "Navigate through different slides using these controls to view all messages on the card.",
      targetElement: "slide-navigation",
    },
    {
      title: "Step 3: Shared Gift Fund",
      description: "Contributors can chip in for a shared gift fund. Click here to add your contribution.",
      targetElement: "Share-Gift-card",
    },
    {
      title: "Step 4: View Messages",
      description: "View and manage all messages sent to the card. You can see who has contributed and their messages.",
      targetElement: "send-messages"
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      onNext(currentStep + 1);
    } else {
      onClose();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 w-96 relative flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close tutorial"
      >
        <X size={20} />
      </button>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">{currentStepData.title}</h2>
      <p className="text-gray-600 text-sm mb-8">{currentStepData.description}</p>

      <div className="flex justify-between items-center mt-auto">
        <button
          onClick={onSkip}
          className="text-gray-500 hover:text-gray-700 px-4 py-2 transition-colors"
        >
          Skip
        </button>

        <button
          onClick={handleNext}
          className="bg-[#5696DB] hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          {currentStep === steps.length - 1 ? "Finish" : `Next (${currentStep + 1}/${steps.length - 1})`}
        </button>
      </div>
    </div>
  );
};

export default TutorialCard;