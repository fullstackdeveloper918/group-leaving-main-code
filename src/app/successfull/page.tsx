import React from "react";
import SuccessfulPage from "../../components/common/Success";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const cartUuid = searchParams?.cart_uuid;
  return (
    <div>
      <SuccessfulPage cartUuid={cartUuid} />
    </div>
  );
};

export default Page;
