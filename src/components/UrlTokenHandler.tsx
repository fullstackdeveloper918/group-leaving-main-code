"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface Props {
  onToken: (token: string | null) => void;
}

const UrlTokenHandler = ({ onToken }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ read ?token= from URL
  const urltoken = searchParams.get("token");

  useEffect(() => {
    // Case 1: token exists in URL
    if (urltoken) {
      Cookies.set("auth_token", urltoken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      onToken(urltoken);

      // remove token from URL
      router.replace("/");
      return;
    }

    // Case 2: no token in URL → read from cookie
    const storedToken = Cookies.get("auth_token");
    onToken(storedToken || null);
  }, [urltoken, router, onToken]);

  return null;
};

export default UrlTokenHandler;
