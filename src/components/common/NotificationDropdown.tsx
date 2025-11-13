"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  message: string;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    { id: 1, message: "Payment received from John Doe" },
    { id: 2, message: "Your card has been shipped" },
    { id: 3, message: "Account password updated" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-6">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Notifications"
          className="relative flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <Bell className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">
            Notifications
          </span>

          {notifications.length > 0 && (
            <span className="absolute top-0 -right-6 bg-[#558EC9] text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {notifications.length}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-[22rem] bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="max-h-64 overflow-y-auto  divide-gray-100">
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    className="relative px-4 py-3 list-item text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors before:content-['•'] before:mr-2 before:text-gray-400"
                  >
                    {note.message}
                  </div>
                ))
              ) : (
                <p className="px-4 py-6 text-sm text-gray-400 text-center">
                  No new notifications
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50">
              <Link
                href="/notifications"
                className="block text-center px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
              >
                See all notifications
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
