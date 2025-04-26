import EmailVerif from '@/components/EmailVerif';
import React from 'react'

const page = ({ searchParams }:any) => {
    console.log(searchParams,"verifyemailtokenn");
    
  return (
   <>
   <EmailVerif searchParam={searchParams.token}/>
   </>
  ) 
}

export default page