"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { FiChevronDown, FiGift, FiDollarSign, FiSearch } from "react-icons/fi";

const icons: Record<string, JSX.Element> = {
  "All Occasion": <FiGift className="inline mr-2 text-lg" />,
  "Plans & Pricing": <FiDollarSign className="inline mr-2 text-lg" />,
  Explore: <FiSearch className="inline mr-2 text-lg" />,
};

const MegaMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    {
      title: "All Occasion",
      links: [
        { name: "Farewell", href: "/card/farewell" },
        { name: "Birthday", href: "/card/birthday" },
        { name: "Baby", href: "/card/baby" },
        { name: "Get Well Soon", href: "/card/get-well" },
        { name: "Sympathy", href: "/card/sympathy" },
        { name: "Teacher", href: "/card/teacher" },
        { name: "Thank-you", href: "/card/thank-you" },
        { name: "Retirement", href: "/card/retirement" },
        { name: "Congratulations", href: "/card/congratulations" },
        { name: "Anniversary", href: "/card/anniversary" },
        { name: "Welcome", href: "/card/welcome" },
        { name: "New-home", href: "/card/new-home" },
        { name: "Boss", href: "/card/boss" },
      ],
    },
    {
      title: "Birthday",
      links: [{ name: "Birthday", href: "/card/birthday" }],
    },
    {
      title: "Get Well Soon",
      links: [{ name: "Get Well Soon", href: "/card/get-well" }],
    },
    {
      title: "Thank you",
      links: [{ name: "Thank you", href: "/card/thank-you" }],
    },
    {
      title: "New home",
      links: [{ name: "New home", href: "/card/new-home" }],
    },
    {
      title: "Anniversary",
      links: [{ name: "Anniversary", href: "/card/anniversary" }],
    },
  ];

  const handleMouseEnter = (title: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpenMenu(title);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  return (
    <nav className="bg-white megamenu shadow-lg w-full border-t border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="flex justify-center items-center gap-10 px-4 py-3">
        {menuItems.map((menu, index) => {
          const isDropdown = menu.links.length > 1;

          return (
            <div
              key={menu.title}
              className="relative"
              onMouseEnter={() => isDropdown && handleMouseEnter(menu.title)}
              onMouseLeave={() => isDropdown && handleMouseLeave()}
            >
              {isDropdown ? (
                <button className="flex items-center gap-1 text-gray-900 font-semibold transition-colors duration-200  focus:outline-none cursor-pointer">
                  {icons[menu.title]}
                  {menu.title}
                  <FiChevronDown className="ml-1 text-sm" />
                </button>
              ) : (
                <Link
                  href={menu.links[0].href}
                  className="flex items-center gap-1 text-gray-900 font-semibold transition-colors duration-200 "
                >
                  {icons[menu.title]}
                  {menu.links[0].name}
                </Link>
              )}

              {isDropdown && openMenu === menu.title && (
                <div className="flex flex-1">
                  <div
                    className={`absolute top-full mt-3 bg-white rounded-xl shadow-2xl ring-1 ring-blue-100 p-6 transition-all duration-300 ${
                      index === 0
                        ? "w-[70rem] flex gap-10 left-[260%] transform -translate-x-1/2"
                        : "w-52"
                    }`}
                    onMouseEnter={() => handleMouseEnter(menu.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className=" flex flex-[20rem] ">
                      <div className="grid-cols-3 w-full grid gap-4">
                        {menu.links.map((link) => (
                          <>
                            <Link
                              key={link.name}
                              href={link.href}
                              className="block py-2 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                              {link.name}
                            </Link>
                          </>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col bg-greyBorder p-6 rounded-xl space-y-6 w-full max-w-md mx-auto">
                      {/* Custom Card */}
                      <div className="flex flex-col space-y-1">
                        <h3 className="text-lg font-semibold">Custom Card</h3>
                        <p className="text-gray-600">
                          Upload your own card design and customise
                        </p>
                      </div>

                      {/* Bulk send cards */}
                      <div className="flex flex-col space-y-1">
                        <h3 className="text-lg font-semibold">
                          Bulk send cards
                        </h3>
                        <p className="text-gray-600">
                          Upload multiple recipients to send to
                        </p>
                      </div>

                      {/* Bulk send gift cards */}
                      <div className="flex flex-col space-y-1">
                        <h3 className="text-lg font-semibold">
                          Bulk send gift cards
                        </h3>
                        <p className="text-gray-600">
                          Send gift cards to multiple people
                        </p>
                      </div>

                      {/* Get Started Button */}
                      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default MegaMenu;
