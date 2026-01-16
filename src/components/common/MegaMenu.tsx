"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { FiChevronDown, FiGift, FiDollarSign, FiSearch } from "react-icons/fi";
import { AiOutlineSmile } from "react-icons/ai";
import {
  Award,
  Baby,
  Book,
  Building,
  Gift,
  Group,
  HandCoins,
  Heart,
  HeartCrack,
  Home,
  NotebookText,
  Palette,
  PartyPopper,
  PartyPopperIcon,
  Smile,
  WalletCards,
} from "lucide-react";
import { FaAward } from "react-icons/fa";

const icons: Record<string, JSX.Element> = {
  "All Occasion": <FiGift className="inline mr-2 text-lg" />,
  "Plans & Pricing": <FiDollarSign className="inline mr-2 text-lg" />,
  Explore: <FiSearch className="inline mr-2 text-lg" />,
};

// Map each All Occasion link to an icon/logo
const linkIcons: Record<string, JSX.Element> = {
  Farewell: <Smile className="inline mr-2 text-blue-500" />,
  Birthday: <PartyPopper className="inline mr-2 text-pink-500" />,
  Baby: <Baby className="inline mr-2 text-green-500" />,
  "Get Well Soon": <Gift className="inline mr-2 text-yellow-500" />,
  Sympathy: <Heart className="inline mr-2 text-gray-500" />,
  Teacher: <Book className="inline mr-2 text-purple-500" />,
  "Thank-you": <Award className="inline mr-2 text-indigo-500" />,
  Retirement: <Award className="inline mr-2 text-orange-500" />,
  Congratulations: <PartyPopper className="inline mr-2 text-pink-500" />,
  Anniversary: <HeartCrack className="inline mr-2 text-pink-600" />,
  Welcome: <Home className="inline mr-2 text-green-600" />,
  "New-home": <Gift className="inline mr-2 text-teal-500" />,
  Boss: <Building className="inline mr-2 text-blue-700" />,
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
      popular: [
        { name: "Farewell", href: "/card/farewell" },
        { name: "Birthday", href: "/card/birthday" },
        { name: "Baby", href: "/card/baby" },
        { name: "Get Well Soon", href: "/card/get-well" },
        { name: "Sympathy", href: "/card/sympathy" },
        { name: "Teacher", href: "/card/teacher" },
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
    <nav className="bg-white hidden lg:block megamenu2 z-20 w-full border-t border-b border-[#e5e7eb] sticky top-0 ">
      <div className="flex justify-center items-center gap-5 px-4 py-3">
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
                <button className="flex items-center gap-1 text-gray-900 font-semibold transition-colors duration-200 focus:outline-none cursor-pointer">
                  {icons[menu.title]}
                  {menu.title}
                  <FiChevronDown className="ml-1 text-sm" />
                </button>
              ) : (
                <Link
                  href={menu.links[0].href}
                  className="flex items-center font-semibold gap-1 text-gray-900  transition-colors duration-200"
                >
                  {icons[menu.title]}
                  {menu.links[0].name}
                </Link>
              )}

              {isDropdown && openMenu === "All Occasion" && (
                <div className="flex flex-1 megamenu">
                  <div
                    className={`absolute top-full mt-3 bg-white rounded-xl shadow-2xl ring-1 ring-blue-100 p-10 transition-all duration-300 ${
                      index === 0
                        ? "w-[78rem] flex gap-10 left-[280%] transform -translate-x-1/2"
                        : "w-52"
                    }`}
                    onMouseEnter={() => handleMouseEnter("All Occasion")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="flex flex-[20rem]"
                      style={{
                        alignItems: "start",
                        gap: "2rem",
                        justifyContent: "space-around",
                      }}
                    >
                      {/* Popular Section */}
                      <div className="flex flex-col w-[34%] justify-start">
                        <h1 className="text-[30px] mb-0">Most Popular</h1>
                        <hr className="bg-[#1b6fc9] h-[2px] my-2" />
                        <div className="grid-cols-1 grid gap-3 mt-1">
                          {menu?.popular?.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="py-2 flex font-extrabold items-center gap-2 rounded-lg text-gray-700  hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                              {linkIcons[link.name]}
                              <span className="font-semibold">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* All Occasions Section */}
                      <div className="flex flex-col justify-start">
                        <h1 className="text-[30px] mb-0">All Occasions</h1>
                        <hr className="bg-[#1b6fc9] h-[2px] my-2" />
                        <div className="grid-cols-2 mt-1 gap-x-[100px] grid gap-y-3">
                          {menu.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="py-2 flex text-[#1b6fc9] font-extrabold items-center gap-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                              {linkIcons[link.name]}
                              <span className="font-semibold">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Logo Cards Section */}
                    <div className="flex flex-col p-4 rounded-xl space-y-6 w-full max-w-md mx-auto">
                      {/* Custom Card */}
                      <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow ">
                        <div className="flex ">
                          <div className="flex flex-1 flex-col space-y-2">
                            <div className="flex items-center gap-3">
                              <NotebookText
                                color="#1b6fc9"
                                height={40}
                                width={40}
                              />
                              <h3 className="text-xl mt-2 font-semibold">
                                Greetings
                              </h3>
                            </div>
                            <p className="text-gray-600">
                              More space for everyone to share their thoughts
                              and make it truly special.
                            </p>
                          </div>
                          <div className="flex items-end h-full">
                            <Link href="/card/farewell">
                              <button className="mt-2  h-[40px] shadow-2xl bg-[#558EC9] text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
                                Get Started
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow ">
                        <div className="flex ">
                          <div className="flex flex-1 flex-col space-y-2">
                            <div className="flex items-center gap-3">
                             {/* <Group height={40} color="#1b6fc9" width={40} /> */}
                             <WalletCards height={40} color="#1b6fc9" width={40} />
                              <h3 className="text-xl mt-2 font-semibold">
                                Card Bundles
                              </h3>
                            </div>
                            <p className="text-gray-600">
                              Create cards one at a time to send to a friend or colleague or purchase a card bundle if you plan to send 5 or more cards.
                            </p>
                          </div>
                          <div className="flex items-end h-full">
                            <Link href="/pricing#card_bundle">
                              <button className="mt-2  h-[40px] shadow-2xl bg-[#558EC9] text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
                                Get Started
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow ">
                        <div className="flex ">
                          <div className="flex flex-1 flex-col space-y-2">
                            <div className="flex items-center gap-3">
                              <Group height={40} color="#1b6fc9" width={40} />
                              <h3 className="text-xl mt-2 font-semibold">
                                Bulk Send Cards
                              </h3>
                            </div>
                            <p className="text-gray-600">
                              A digital pinboard to add unlimited messages and
                              images on a scrollable page for endless
                              creativity.
                            </p>
                          </div>
                          <div className="flex items-end h-full">
                            <Link href="/board">
                              <button className="mt-2  h-[40px] shadow-2xl bg-[#558EC9] text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
                                Get Started
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 p-4 bg-white rounded-lg shadow ">
                        <div className="flex ">
                          <div className="flex flex-1 flex-col space-y-2">
                            <div className="flex items-center gap-3">
                              <HandCoins
                                color="#1b6fc9"
                                height={40}
                                width={40}
                              />
                              <h3 className="text-xl mt-2 font-semibold">
                                Gift Fund
                              </h3>
                            </div>
                            <p className="text-gray-600">
                              Collect cash for the perfect gift—simple,
                              convenient, and just what they’ll love.
                            </p>
                          </div>
                          <div className="flex items-end h-full">
                            <Link href="/pool/new">
                              <button className="mt-2  h-[40px] shadow-2xl bg-[#558EC9] text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
                                Get Started
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div> */}
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
