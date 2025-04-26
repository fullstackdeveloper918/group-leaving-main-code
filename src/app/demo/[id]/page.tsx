import DemoCard from '@/components/DemoCard'
import React from 'react'

const page = ({params}:any) => {
  console.log(params.id,"params");
  
  return (
    <div>
      <DemoCard params={params.id}/>
    </div>
  )
}

export default page
