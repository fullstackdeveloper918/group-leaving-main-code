"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoutModal from "./LogoutModal";
import { useParams, useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import GoodLuckCad from "../../../public/newimage/Groupwish-logo.png";
import register from "../../assets/images/register.png";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const param = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    let token = "";
    if (typeof param.auth === "string") {
      token = param.auth.split("token%3D")[1] || param.auth;
    } else if (Array.isArray(param.auth)) {
      token = param.auth[0]?.split("token%3D")[1] || param.auth[0];
    }
    const storedToken = Cookies.get("auth_token");
    if (token && !storedToken) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    const token: any = Cookies.get("auth_token");
    setAccessToken(token);
  }, [param]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    destroyCookie(null, "auth_token", { path: "/" });
    destroyCookie(null, "COOKIES_USER_ACCESS_TOKEN", { path: "/" });
    router.push(`/login`);
  };

  const confirmLogout = () => {
    handleLogout();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("dropdownMenu");
      const button = document.getElementById("dropdownMenuButton1");

      if (
        menu &&
        button &&
        !menu.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        menu.classList.remove("show");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="announcementBar bg-blueText text-center md:py-2 p-1 text-white">
        <p className="text-xs font-normal mb-0 text-center">
          Our back-to-school sale is here!{" "}
          <span className="font-bold">Save 15%</span> on Coins for all your fall
          invitations with code BACKTOFALL. Ends 9/3. 
          <Link href="/create" className="underline text-white font-medium">
            Shop Now.
          </Link>
        </p>
      </div>
      <header className="w-full">
        {/* Main Header */}
        <div className="flex justify-between items-center md:py-4 md:px-6 px-2 py-3 container-fluid">
          {/* Logo */}
          <Link href={`/`} className="no-underline w-3/12">
            <Image
              src={GoodLuckCad.src}
              height={200}
              width={200}
              alt="Good Luck"
              className="text-4xl font-bold logo_img"
            />
          </Link>

          <div className="flex items-center space-x-4 w-9/12 justify-end">
            {/* Auth and Button */}
            <div className="flex items-center lg:space-x-6 sm:space-x-4 gap-2">
              <Link
                href="/create"
                className="text-md btnPrimary  hidden md:block text-blackText no-underline font-medium hover:text-blueText start-cardBtn"
              >
                Start a Card
              </Link>

              {accessToken ? (
                <>
                  <Link
                    href="/account/cards"
                    className="text-md  hidden md:block text-blackText no-underline font-medium hover:text-blueText "
                  >
                    Dashboard
                  </Link>
                  <div className="dropdown">
                    <img
                      src="https://img.freepik.com/premium-psd/greeting-card-with-flowers-it-pink-background_74869-4261.jpg?w=826"
                      alt="Profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      id="dropdownMenuButton1"
                      onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                        e.stopPropagation(); // Prevent triggering document click
                        const menu = document.getElementById("dropdownMenu");
                        menu?.classList.toggle("show");
                      }}
                    />
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                      id="dropdownMenu"
                    >
                      <li>
                        <Link
                          href="/card/farewell"
                          className="dropdown-item"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.stopPropagation();
                            document
                              .getElementById("dropdownMenu")
                              ?.classList.remove("show");
                          }}
                        >
                          Browse Cards
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pricing"
                          className="dropdown-item"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.stopPropagation();
                            document
                              .getElementById("dropdownMenu")
                              ?.classList.remove("show");
                          }}
                        >
                          Our Plans
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <span className="text-[#970119] font-semibold">
                            Sign Out
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href={`/register`}
                    className="text-md hidden md:block text-blackText no-underline font-medium signIn_Btn"
                  >
                    Join Now
                    <img
                      src={register.src}
                      alt="img"
                      className="mobileVisible"
                    />
                  </Link>
                  <Link
                    href="/login"
                    className="text-md hidden md:block text-blackText no-underline font-medium signIn_Btn"
                  >
                    Sign In
                  </Link>
                </>
              )}

              {isMobile ? (
                isMenuOpen ? (
                  <button
                    className="text-gray-600 z-20 absolute top-2 right-2"
                    onClick={handleMenuToggle}
                  >
                    {"✖"}
                  </button>
                ) : (
                  <button
                    className="text-gray-600 z-20 ml-2"
                    onClick={handleMenuToggle}
                  >
                    {"☰"}
                  </button>
                )
              ) : null}
            </div>
          </div>
        </div>
        {isMobile ? (
          <nav
            className={`md:hidden text-sm text-gray-700  absolute inset-x-0  transition-transform duration-300 p-5 px-4 top-0 bg-[#e2eefa] z-10 h-lvh ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Link
              href="/card/farewell"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              Farewell
            </Link>
            <Link
              href="/card/birthday"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              Birthday Cards
            </Link>
            <Link
              href="/card/baby"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              New Baby
            </Link>
            <Link
              href="/card/retirement"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              Retirement
            </Link>
            <Link
              href="/card/sympathy"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              Sympathy
            </Link>
            <Link
              href="/card/wedding"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              Wedding
            </Link>
            <Link
              href="/card/welcome"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md  border-b border-[#8b8b8b29]"
            >
              Welcome
            </Link>
            <Link
              href="/card/thank-you"
              className="block lg:px-4 md:px-2 py-3 hover:text-blueText no-underline text-black m-0 text-md "
            >
              Thank You
            </Link>
          </nav>
        ) : (
          ""
        )}
      </header>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Navbar;
