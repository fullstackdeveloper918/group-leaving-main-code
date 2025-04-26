"use client";
import GroupCollection from "../../../components/GroupCollection";
import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

interface PageProps {
  params: { id: string };
  searchParams: Record<string, any>;
}

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  console.log(params.id, "Fetching Data...");

  const [data, setData] = useState<any>(null);
  const [isClose, setClose] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(params.id, "Fetching Data...");
        const response = await fetch(
          `https://dating.goaideme.com/razorpay/single-link-listing/${params.id}`,
          {
            method: "GET",
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        console.log(jsonData, "Response Data");
        setData(jsonData);
      } catch (err: any) {
        // toast.error("Error fetching data: " + err.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [isClose]);

  // if (loading) return <p>Loading...</p>;

  return <GroupCollection params={params} searchParams={searchParams} data={data} setClose={setClose} isClose={isClose} />;
};

export default Page;
