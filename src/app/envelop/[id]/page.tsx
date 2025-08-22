import EnvelopCard from '@/components/common/EnvelopCard'
import React from 'react'

const page = async(params:any) => {
  const id = params?.params?.id;
  console.log(id,"hsjkhajkshd");
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card/edit-messages-by-unique-id/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${authToken}`, // Add authToken if needed
    },

  });

  const data = await response.json();
  console.log(data, "responseData");
  return (
    <div>

        <EnvelopCard getdata={data}/>
        {/* <ImageAnimation/> */}
    </div>
  )
}

export default page