import CreateBoard from '@/components/CreateBoard'
import React from 'react'

const page = async() => {

  let data = await fetch('https://dating.goaideme.com/tango/fetch-data', {
    method: 'GET', // Method set to GET
    headers: {
      'Cache-Control': 'no-cache',
      // 'authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
       cache: 'reload'
    }
  });
  // console.log(gettoken,"ggg");
  // Parse the response JSON
  let posts = await data.json();
  console.log(posts,"posts");
  return (
    <div>
        <CreateBoard data={posts}/>
    </div>
  )
}

export default page