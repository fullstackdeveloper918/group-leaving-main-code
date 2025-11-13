import CreateBoard from "@/components/CreateBoard";
import React from "react";

const page = async () => {
  let posts = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tango/fetch-data`,
      {
        method: "GET",
        cache: "no-store", // disables Next.js cache
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    posts = await res.json();
  } catch (error) {
    console.error("Failed to fetch API data:", error);
    posts = []; // fallback so CreateBoard doesn't break
  }
  return (
    <div>
      <CreateBoard data={posts} />
    </div>
  );
};

export default page;
