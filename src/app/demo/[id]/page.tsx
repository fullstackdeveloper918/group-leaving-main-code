import DemoCard from "@/components/DemoCard";
import React from "react";

const page = ({ params }: any) => {
  return <DemoCard params={params.id} />;
};

export default page;
