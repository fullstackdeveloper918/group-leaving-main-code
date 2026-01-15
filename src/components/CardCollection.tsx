import Sidebar from "./common/Sidebar";
import Card from "./common/Card";
import CollectionFilter from "./common/CollectionFilter";
import { fetchFromServer } from "@/app/actions/fetchFromServer";
const CardCollection = async ({ params }: any) => {
  // Extract type and cardLabel from URL params
  const type = params.slug[0];
  const searchQuery = params?.slug[1]; // Assuming search type (popular, new, trending) is the second slug
  // Sidebar: Fetch collection listing
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/card/collection-listing`,
    { cache: "no-store" }
  );
  let data1 = await data.json();
  // Find the matching collection type (UUID) based on the URL slug
  const normalizedType = type.replace("-", " ");
  const matchedObject = data1?.data.find((item: any) => {
    const normalizedTags = item.collection_title.replace("-", " ");
    return normalizedTags === normalizedType;
  });
  const collectionType = matchedObject ? matchedObject.uuid : null;
  // Validate the search query (allow only popular, new, and trending)
  const validSearchQueries = ["popular", "new", "trending"];
  const finalSearchQuery = validSearchQueries.includes(searchQuery)
    ? searchQuery
    : "";
  // All cards: Fetch cards based on search and category params
  const api2 = {
    url: `${
      process.env.NEXT_PUBLIC_API_URL
    }/card/card-listing?search=${encodeURIComponent(
      finalSearchQuery
    )}&category=${encodeURIComponent(collectionType)}`,
    method: "GET",
  };
  const response = await fetchFromServer(api2);

  return (
    <div className=" bg-lightBg pt-12">
      <div className="container-fluid">
        <div className="md:flex md:space-x-3 md:space-y-0 space-y-6 ">
          {/* Sidebar with collection data */}
          <Sidebar
            urlValue={params?.slug[0]}
            cardLabel={finalSearchQuery}
            response={data1}
          />
          <main className="flex-1 md:pl-3">
            <div className="flex md:justify-between md:items-center mb-6 md:flex-row flex-col-reverse justify-start">
              <h2 className="xl:text-4xl md:text-lg text-md font-semibold mt-3 ">
                Pick a <span className="capitalize">{params?.slug[0]}</span>{" "}
                Card Design
              </h2>
              <CollectionFilter />
            </div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-4 gap-6 min_gap">
              {response?.listing?.map((card: any) => (
                <Card item={card} index={card.id} key={card.id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default CardCollection;
