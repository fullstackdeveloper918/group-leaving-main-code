import EmailVerif from '@/components/EmailVerif';
import React from 'react'

const page = ({ searchParams }:any) => {
  return (
   <>
   <EmailVerif searchParam={searchParams.token}/>
   </>
  ) 
}

export default page