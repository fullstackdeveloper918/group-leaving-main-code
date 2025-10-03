import React from "react";
import SuccessfulPage from "../../components/common/Success";

// This is a Server Component receiving searchParams as a prop
const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const cartUuid = searchParams?.cart_uuid;
  const uniqueId = searchParams?.unique_id;
  return (
    <div>
      <SuccessfulPage cartUuid={cartUuid} />
    </div>
  );
};

export default Page;
