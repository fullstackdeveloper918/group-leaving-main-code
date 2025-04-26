import React, { useState } from "react";
import { Save, Info } from "lucide-react";

interface EmailFormProps {
  onCancel: () => void;
  onSave?: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onCancel, onSave }) => {
  const [email, setEmail] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave(email);
    }
    onCancel();
  };

  return (
    <div className="bg-white p-4 mt-2 rounded-md shadow-md animate-fadeIn">
      <div className="relative mb-4">
        <label htmlFor="email" className="text-gray-500 text-sm mb-1 block">
          Your email (optional)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Your email (optional)"
        />

        <button
          className="absolute right-1 top-[30px] text-gray-400 hover:text-gray-600"
          onClick={() => setShowInfo(!showInfo)}
          aria-label="Information"
        >
          <Info size={16} />
        </button>

        {showInfo && (
          <div className="absolute right-0 top-[55px] bg-white p-2 rounded shadow-md text-xs w-60 text-gray-600 z-10">
            Your email is used to send you a copy of your message. We don't
            share your email with third parties.
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-red-500 hover:bg-red-50 rounded transition editor-cancel"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#061178] text-white rounded flex items-center gap-1 hover:bg-indigo-800 transition editor-save"
        >
          <Save size={16} />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default EmailForm;
