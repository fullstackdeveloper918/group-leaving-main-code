import CreateGroup from "@/components/CreateGroup";
import React from "react";

export const dynamic = "force-dynamic";

const page = async () => {
  let posts = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tango/fetch-data`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    posts = await res.json();
  } catch (e) {
    console.error("Error fetching:", e);
  }

  return <CreateGroup data={posts} />;
};

export default page;
