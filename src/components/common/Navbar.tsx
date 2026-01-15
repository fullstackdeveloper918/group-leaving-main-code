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
import MegaMenu from "./MegaMenu";

const Navbar = () => {
  const router = useRouter();
  const param = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    // Ensure we're on the client side before accessing cookies
    if (typeof window !== 'undefined') {
      let token = "";
      if (typeof param.auth === "string") {
        token = param.auth.split("token%3D")[1] || param.auth;
      } else if (Array.isArray(param.auth)) {
        token = param.auth[0]?.split("token%3D")[1] || param.auth[0];
      }
        const storedToken = Cookies.get("auth_token");
      if (token && !storedToken && token !== "login") {
        Cookies.set("auth_token", token);
        setAccessToken(token); // Set access token immediately
        router.replace("/");
      }
    }
  }, []);

  /* =====================================================
     ✅ FIX ADDED: READ COOKIE ON FIRST LOAD (GOOGLE REDIRECT)
     ===================================================== */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("auth_token");
      setAccessToken(token || null);
      //  router.replace("/");
    }
  }, []);
  useEffect(() => {
    // Ensure we're on the client side before accessing cookies
    if (typeof window !== 'undefined') {
      const token = Cookies.get("auth_token");
      setAccessToken(token || null);
    }
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
    Cookies.remove("auth_token");
    Cookies.remove("user_info");
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

  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        document.body.style.overflow = ""; // Re-enable scrolling
      }
    } else {
      document.body.style.overflow = ""; // Ensure scroll works normally on desktop
    }

    // Cleanup (important when component unmounts)
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobile]);

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
              alt="Groupwish"
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
                    className="text-gray-600 z-50 absolute top-2 right-2 text-[24px]"
                    onClick={handleMenuToggle}
                  >
                    {"✖"}
                  </button>
                ) : (
                  <button
                    className="text-gray-600 z-50 ml-2 text-[21px]"
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
            className={`md:hidden text-sm text-gray-700 z-40 absolute inset-x-0 transition-transform duration-300 p-5 px-4 top-0 bg-[#e2eefa] h-lvh ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* --- Top Section: Authenticated vs Guest --- */}
            <div className="border-b border-[#8b8b8b29] pb-0">
              {accessToken ? (
                <>
                  <Link
                    href="/account/cards"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-md text-blackText no-underline font-medium py-2 hover:text-blueText"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-md text-blackText no-underline font-medium border-b border-[#8b8b8b29] pb-3 hover:text-blueText"
                  >
                    Join Now
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-md text-blackText no-underline font-medium py-3 hover:text-blueText"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* --- Cards Submenu --- */}
            <div>
              <button
                onClick={() => setSubMenuOpen(!isSubMenuOpen)}
                className="w-full text-left text-md font-medium text-black py-3 border-b border-[#8b8b8b29] flex justify-between items-center"
              >
                Cards
                <span>{isSubMenuOpen ? "▲" : "▼"}</span>
              </button>

              {isSubMenuOpen && (
                <div className="mt-2">
                  {[
                    { href: "/card/farewell", label: "Farewell" },
                    { href: "/card/birthday", label: "Birthday Cards" },
                    { href: "/card/baby", label: "New Baby" },
                    { href: "/card/retirement", label: "Retirement" },
                    { href: "/card/sympathy", label: "Sympathy" },
                    { href: "/card/wedding", label: "Wedding" },
                    { href: "/card/welcome", label: "Welcome" },
                    { href: "/card/thank-you", label: "Thank You" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 hover:text-blueText border-[#8b8b8b29] no-underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
