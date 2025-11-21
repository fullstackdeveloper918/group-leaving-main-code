"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CollectionFilter = () => {
  const router = useRouter();
  const searchParam = useParams();
  const urlValue = searchParam?.slug[0];
  const urlValue1 = searchParam?.slug[1];
  console.log(urlValue, "searchParam");
  const { slug } = useParams();
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (slug && slug[0]) {
      setSelectedOption(slug[0]);
    }
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toLowerCase();
    setSelectedOption(value);

    // Check if the selected value is "Popularity"
    if (value === "") {
      // Navigate to the URL without the filter
      router.push(`/card/${urlValue}`);
    } else {
      // Navigate to the URL with the selected filter
      router.push(`/card/${urlValue}/${value}`);
    }
  };

  return (
    <div className="text-end">
      <div className="text-right">
        <select
          className="border border-gray-300 p-2 rounded DroptextSize"
          value={urlValue1}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="popular">Popularity</option>
          <option value="trending">Trending</option>
          <option value="new">New</option>
        </select>
      </div>
    </div>
  );
};

export default CollectionFilter;
