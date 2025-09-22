import EnvelopCard from "@/components/common/EnvelopCard";
import React from "react";

// This is a Server Component, so data is fetched on the server
const Page = async ({ params }: { params: { id: string } }) => {
  const id = params?.id;

  //  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card/edit-messages-by-unique-id/${id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Authorization': `Bearer ${authToken}`, // Add authToken if needed
  //   },

  // });

  // const data = await response.json();
  // console.log(data, "responseData");

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

    console.log(data, "data from envelop page");

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
