import EnvelopCard from "@/components/common/EnvelopCard";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params?.id;


  try {
    const postData = {
      cartUuid: id,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/single-cart-by-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if required
        },
        body: JSON.stringify(postData),
        // Optional: Enable cache control if needed
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }

    const data = await response.json();


    return (
      <div>
        <EnvelopCard getdata={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return <div>Error loading envelope data.</div>;
  }
};

export default Page;
