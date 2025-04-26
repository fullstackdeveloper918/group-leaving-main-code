"use server";
import { cookies } from "next/headers";
import { Api } from "../../interfaces/interfaces";
export async function fetchFromServer(api: Api): Promise<any> {
  const { url, method, body = null } = api;
  // :white_tick: Correct way to get the token in Next.js
  const getToken = cookies().get("auth_token")?.value || "";
  console.log(getToken, "Access Token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };
  if (getToken) {
    headers["Authorization"] = `Bearer ${getToken}`;
  }
  const options: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(url, options);
    if (res.status === 401) {
      console.error("Token expired, logging out...");
      // :white_tick: Correct way to delete the cookie in a server action
      cookies().delete("auth_token");
      // :white_tick: Return a special error response (client should handle redirect)
      return { error: "Token expired", redirect: "/login" };
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: "An error occurred while fetching data" };
  }
}














