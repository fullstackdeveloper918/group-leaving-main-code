"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
const quicksand = Montserrat({ subsets: ["latin"] });
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Script from "next/script";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import msalConfig from "../utils/msalConfig";
import NextTopLoader from "nextjs-toploader";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const msalInstance = new PublicClientApplication(msalConfig);
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { AccessTokenProvider } from "./context/AccessTokenContext";
// import { Montserrat } from 'next/font/google'
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MegaMenu from "@/components/common/MegaMenu";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const montserrat: any = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [accessToken, setAccessToken] = useState<string | null>(null);


  useEffect(() => {
    const cookies = parseCookies();
    // console.log(cookies, "coofghjklkies");

    const token = cookies.auth_token;
    // console.log(typeof token, "qwertyu");

    if (token) {
      setAccessToken(token);
    } else {
      // alert("nothing")
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Boogaloo&family=Pacifico&family=Vibur&display=swap"
          rel="stylesheet"
        ></link>
        <Script
          src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"
          strategy="beforeInteractive" // This ensures it loads before the page is interactive
        />
        <Script async src="https://pay.google.com/gp/p/js/pay.js"></Script>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className={quicksand.className}>
        {/* <AntdRegistry> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AccessTokenProvider>
          <AntdRegistry>
            <MsalProvider instance={msalInstance}>
              <Navbar />
              <MegaMenu />
              <NextTopLoader
                color="#00C4CC"
                initialPosition={0.08}
                crawlSpeed={20}
                height={5}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={100}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />

              {children}
              <Footer />
            </MsalProvider>
          </AntdRegistry>
        </AccessTokenProvider>
      </body>
    </html>
  );
}
