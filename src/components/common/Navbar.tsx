"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Images from "@/constants/images";
import Image from "next/image";
import api from "@/utils/api";
import LogoutModal from "./LogoutModal";
import { useParams, useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
// import GoodLuckCad from "../../assets/images/congratulations/good_luck.png"
import GoodLuckCad from "../../assets/images/new_logo.png";
import register from "../../assets/images/register.png";
import { useAccessToken } from "@/app/context/AccessTokenContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const param = useParams();

  console.log("paramsss", param);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const accessToken3 = useAccessToken();
  // console.log(accessToken3, "accessToken3");
  // const { accessToken, setAccessToken } = useAccessToken();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  console.log("accessTokenn", accessToken);

  useEffect(() => {
    let token = "";
    if (typeof param.auth === "string") {
      // Extract token after 'token%3D'
      token = param.auth.split("token%3D")[1] || param.auth;
    } else if (Array.isArray(param.auth)) {
      // If param.auth is an array, take the first element
      token = param.auth[0]?.split("token%3D")[1] || param.auth[0];
    }
    const storedToken = Cookies.get("auth_token");
    if (token && !storedToken) {
      // Cookies.set("auth_token", token);
      router.replace("/");
      // Cookies.set("user_info",userData)
      // setIsNewLogin(true);
    }
    console.log("tokenbyme", token);
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
    // let res = await api.Auth.logout();
    // console.log(res, "qweqwe");
    // setAccessToken(null);
    destroyCookie(null, "auth_token", { path: "/" });
    destroyCookie(null, "COOKIES_USER_ACCESS_TOKEN", { path: "/" });
    router.push(`/login`);
  };

  const confirmLogout = () => {
    handleLogout();
    setIsModalOpen(false);
  };
  // const [state, setState] = useState<any>("");
  // const cookies = parseCookies();
  // const cookies = parseCookies();
  // const accessToken = cookies.COOKIES_USER_ACCESS_TOKEN;
  // console.log(accessToken,"accessToken");
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  // console.log(accessToken, "accessToken");

  // useEffect(() => {
  //   const cookies = parseCookies();
  //   console.log(cookies, "cookies");

  //   const token = cookies.auth_token;
  //   console.log(typeof token, "iooioio");

  //   if (token) {
  //     setAccessToken(token);
  //   } else {
  //     // alert("nothing")
  //   }
  // }, []);

  // const [token, setToken] = useState<string | null>(null);
  // console.log(token, "tsdsdsdoken");

  // useEffect(() => {
  //   // Retrieve token from localStorage when the component mounts
  //   const tokenFromLocalStorage = localStorage.getItem("access_token");

  //   if (tokenFromLocalStorage) {
  //     setToken(tokenFromLocalStorage); // Set it to state if it exists
  //   }
  // }, []);
  // const [state, setState] = useState<any>("");
  // console.log(state, "state");

  // // const cookies = parseCookies();

  // // const accessToken = cookies.auth_token;
  // useEffect(() => {
  //   const accessToken = cookies.auth_token;
  //   setState(accessToken); // Set the token to state
  //   // if(!cookies.auth_token){
  //   //   window.location.reload();
  //   // }
  // }, [cookies.auth_token]);
  // const getuserData = cookies.userInfo;

  // if (getuserData) {
  //   try {
  //     const user_info = JSON.parse(getuserData);
  //     console.log(user_info, "user_info");

  //     // Extracting the token from the user_info object
  //     const token = user_info.token;
  //     console.log("Token:", token);
  //   } catch (error) {
  //     console.error("Error parsing JSON:", error);
  //   }
  // } else {
  //   console.error("getuserData is undefined or null.");
  // }
  // console.log(getuserData, "getuserData");
  // const userInfo=JSON.parse(getuserData);
  // const token1 = userInfo.token;
  // console.log(token1,"sadazxxxxxxxxxxbc");

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
        {/* Banner */}
        {/* <div className="bg-blueBg text-center text-sm md:py-3 py-2 text-white ">
          <span className="w-4/5 px-2 d-block mx-auto md:text-sm text-sm container-fluid">
            Our back-to-school sale is here! Save 15% on Coins for all your fall
            invitations with code BACKTOFALL. Ends 9/3.{" "}
            <a href="#" className="underline text-white">
              Shop Now
            </a>
          </span>
        </div> */}

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
            {/* Search Bar */}
            {/* <div className="relative hidden md:block w-1/3">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-2 border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Image
                  src={Images.Search}
                  alt="search"
                  width={20}
                  height={20}
                />
              </span>
            </div> */}

            {/* Auth and Button */}
            <div className="flex items-center lg:space-x-6 sm:space-x-4 gap-2">
              <Link
                href="/create"
                className="text-md btnPrimary text-blackText hidden md:block text-blackText no-underline font-medium hover:text-blueText start-cardBtn"
              >
                Start a Card
              </Link>
              {/* <a
                href="/card/farewell"
                className="text-md text-blackText hidden md:block text-blackText no-underline font-medium hover:text-blueText "
              >
                Cards
              </a>
              <a
                href="/pricing"
                className="text-md text-blackText hidden md:block text-blackText no-underline font-medium hover:text-blueText "
              >
                Pricing
              </a> */}
              {/* <a
                    href="/account/cards"
                    className="text-md text-blackText hidden md:block text-blackText no-underline font-medium hover:text-blueText "
                  >
                    Computers
                  </a> */}
              {/* <a
                    href="/account/cards"
                    className="text-md text-blackText hidden md:block text-blackText no-underline font-medium hover:text-blueText "
                  >
                    Fashion
                  </a> */}
              {accessToken ? (
                <>
                  <Link
                    href="/account/cards"
                    className="text-md text-blackText hidden md:block text-blackText no-underline font-medium hover:text-blueText "
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
                  

                  <Link href={`/register`}>
                    <button className="text-white font-medium rounded-full  d-hide-btn joinHead_Btn">
                      Join Now
                    </button>
                    <img
                      src={register.src}
                      alt="img"
                      className="mobileVisible"
                    />
                  </Link>
                  <Link
                    href="/login"
                    className="text-md text-blackText hidden md:block text-blackText no-underline font-medium signIn_Btn"
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

        {/* Navigation Links */}
        {
          isMobile ? (
            <nav
              className={`md:hidden text-sm text-gray-700  absolute inset-x-0 top-16 transition-transform duration-300 p-5 px-4 top-0 bg-[#e2eefa] z-10 h-lvh ${
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
          )
          //  (
          //   <nav className="hidden md:flex md:justify-center md:space-x-6 text-sm text-gray-700 py-2 bg-white">
          //     <a
          //       href="/card/farewell"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Farewell
          //     </a>
          //     <a
          //       href="/card/birthday"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Birthday Cards
          //     </a>
          //     <a
          //       href="/card/baby"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       New Baby
          //     </a>
          //     <a
          //       href="/card/retirement"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Retirement
          //     </a>
          //     <a
          //       href="/card/sympathy"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Sympathy
          //     </a>
          //     <a
          //       href="/card/wedding"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Wedding
          //     </a>
          //     <a
          //       href="/card/welcome"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Welcome
          //     </a>
          //     <a
          //       href="/card/thank-you"
          //       className="block lg:px-4 md:px-2 py-2 hover:text-blueText no-underline text-black m-0"
          //     >
          //       Thank You
          //     </a>
          //   </nav>
          // )
        }
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
