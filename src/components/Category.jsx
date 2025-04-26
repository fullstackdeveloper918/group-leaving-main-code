import React from "react";
import Image from "next/image";
import { capFirst } from "@/utils/validation";
import Images from "@/constants/images";
import Link from "next/link";
// import Images from "@/constants/images";
// import {Col, Row  } from 'antd'
// const array = [
//   'https://img.freepik.com/premium-psd/greeting-card-with-flowers-it-pink-background_74869-4261.jpg?w=826',
//   "https://img.freepik.com/premium-vector/simple-floral-thank-you-card-with-watercolor-background_694794-178.jpg?w=1380",
//   "https://img.freepik.com/premium-photo/wedding-invitation-with-flowers-flower-middle_1191871-49377.jpg?w=740",
//   "https://img.freepik.com/free-vector/elegant-daisy-flower-wedding-invitation-card-template_44538-9850.jpg?t=st=1726234933~exp=1726238533~hmac=76bd2c3ed266dec873f39372aaa1973615b57c50375696a913e26d05d5c0598f&w=1380",
//   "https://img.freepik.com/free-psd/beautiful-christmas-floral-wreath-frame-design_21799-10722.jpg?t=st=1726234955~exp=1726238555~hmac=c4406c10583bd202e08964dd43e645727f6f30c21b0db39506af66d271629888&w=1380",
//   "https://img.freepik.com/free-vector/summer-wedding-invitation_53876-92838.jpg?t=st=1726235013~exp=1726238613~hmac=83595c3903b855f20775c71b2bc347e136a2d79fd424053a26770c2514f71cdd&w=826",
//   "https://img.freepik.com/free-psd/beautiful-watercolor-wedding-invitation-card-with-elegant-flower-tiny-foliage_44538-10601.jpg?t=st=1726235036~exp=1726238636~hmac=d1dc9a692078bdca87612cb7db66afe125d8c3af762cab4f66d5add701eac784&w=1060"
// ]
const array = [
  {img: Images.card_1},
  {img: Images.card_2},
  {img: Images.card_3},
  {img: Images.card_4},
  {img: Images.card_5},
  {img: Images.card_2},
  {img: Images.card_3},
  {img: Images.card_1},
  {img: Images.card_2},
  {img: Images.card_3},
]
const Category = ({ item, index }) => {
  return (
    <>
      <div class="flex flex-col items-center">
        <Link href={`/card/${item?.type}`} className="hoverZoom   rounded-full min-h-[150px] min-w-[150px] h-[150px] w-[150px] overflow-hidden no-underline imgSlider">
          <Image
            class="  rounded-full   duration-300 min-h-[80px] min-w-[80px] h-[80px] w-[80px]  rounded-full  w-[120px] ease-in-out "
            src={array[index]?.img}
            // src={item?.imageSrc || array[index]}
            width={100}
            height={100}
            
             className="object-cover"
            alt="category-image"
          />
          {/* <span className="no-underline mt-3 md:text-md sm:text-sm text-blackText d-block font-medium">{capFirst(item?.type)} Cards</span> */}
        </Link>
        {/* <Row gutter={[16, 16]}>
            {array.map((category, i) => (
              <Col xs={12} sm={8} md={6} lg={4} key={i}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                  <Image src={category.icon} alt={category.name} width={100} height={100} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  {category.name}
                </div>
              </Col>
            ))}
          </Row> */}
      </div>
    </>
  );
};

export default Category;
