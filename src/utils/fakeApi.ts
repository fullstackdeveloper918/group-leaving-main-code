import cards from "../constants/home.json"
import banner from "../constants/banner.json"
import reviewData from "../constants/HomePageJson/review.json"
import cardType from "../constants/CardTypeJson/cardtype.json"
import api from "./api";
import axios from "axios";
export const fakeURL = 'http://127.0.0.1:3000/';
export const fetchCards = async(): Promise<typeof cards> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cards);
      }, 1000); 
    });
  };
  export const fetchCards1 = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LIVE_API_URL}/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const fetchCardsType = (): Promise<typeof cardType> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cardType);
      }, 1000); 
    });
  };
//   export const fetchCards = async (): Promise<typeof cards> => {
//     try {
//       // const response = await axios.get("domain_main/v1/cards");
//       // return response.data;
//         return cards;
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         throw error;
//     }
// };


export const fetchBanner = (): Promise<typeof banner> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(banner);
      }, 1000); 
    });
  };

export const fetchReview = (): Promise<typeof reviewData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(reviewData);
      }, 1000); 
    });
  };


  // export const fetchBannerData = async (): Promise<any> => {
  //   try {
  //       const response = await api.User.listing();
        
  //       if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //       }
  
  //       const data: any = await response.json();
  //       return data;
  //   } catch (error) {
  //       console.error('Error fetching banner data:', error);
  //       throw error;
  //   }
  // };