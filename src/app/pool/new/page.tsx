import CreateGroup from '@/components/CreateGroup'
import Link from 'next/link'
import React from 'react'

const page = async() => {

  let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tango/fetch-data`, {
    method: 'GET', 
    headers: {
      'Cache-Control': 'no-cache',
       cache: 'reload'
    }
  });
  let posts = await data.json();

  return (
   <>
   <CreateGroup data={posts}/>
   </>
  )
}

export default page