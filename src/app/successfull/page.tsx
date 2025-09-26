import React from "react";
import SuccessfulPage from "../../components/common/Success";

// This is a Server Component receiving searchParams as a prop
const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  console.log(searchParams, "searchParams");

  const cartUuid = searchParams?.cart_uuid;
  const uniqueId = searchParams?.unique_id;

  console.log(cartUuid, "cartUuid here");

  return (
    <div>
      <SuccessfulPage cartUuid={cartUuid} />
    </div>
  );
};

export default Page;
