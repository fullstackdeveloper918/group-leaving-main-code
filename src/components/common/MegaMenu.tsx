"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { FiChevronDown, FiGift, FiDollarSign, FiSearch } from "react-icons/fi";

const icons: Record<string, JSX.Element> = {
  "Cards by Occasion": <FiGift className="inline mr-2 text-lg" />,
  "Plans & Pricing": <FiDollarSign className="inline mr-2 text-lg" />,
  Explore: <FiSearch className="inline mr-2 text-lg" />,
};

const MegaMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    {
      title: "Cards by Occasion",
      links: [
        { name: "Birthday", href: "/card/birthday" },
        { name: "Farewell", href: "/card/farewell" },
        { name: "Wedding", href: "/card/wedding" },
        { name: "New Baby", href: "/card/baby" },
        { name: "Retirement", href: "/card/retirement" },
        { name: "Sympathy", href: "/card/sympathy" },
        { name: "Welcome", href: "/card/welcome" },
        { name: "Thank You", href: "/card/thank-you" },
        { name: "Wedding", href: "/card/wedding" },
        { name: "New Baby", href: "/card/baby" },
        { name: "Retirement", href: "/card/retirement" },
        { name: "Sympathy", href: "/card/sympathy" },
        { name: "Welcome", href: "/card/welcome" },
        { name: "Thank You", href: "/card/thank-you" },
        { name: "Wedding", href: "/card/wedding" },
        { name: "New Baby", href: "/card/baby" },
        { name: "Retirement", href: "/card/retirement" },
        { name: "Sympathy", href: "/card/sympathy" },
        { name: "Welcome", href: "/card/welcome" },
        { name: "Thank You", href: "/card/thank-you" },
        { name: "Wedding", href: "/card/wedding" },
        { name: "New Baby", href: "/card/baby" },
        { name: "Retirement", href: "/card/retirement" },
        { name: "Sympathy", href: "/card/sympathy" },

      ],
    },
    {
      title: "Plans & Pricing",
      links: [{ name: "Pricing", href: "/pricing" }],
    },
    {
      title: "Explore",
      links: [{ name: "Explore", href: "/explore" }],
    },
    {
      title: "Explore",
      links: [{ name: "Explore", href: "/explore" }],
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
                        ? "w-[70rem] flex gap-10 left-[259%] transform -translate-x-1/2"
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
                    <div className="flex flex-1 bg-greyBorder">dropdown content</div>
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
