import React from 'react'
import SuccessfulPage from '../../components/common/Success';
const page = ({searchParams}:any) => {
    console.log(searchParams,"searchParams");
    
    const uniqueId = searchParams?.unique_id; // Safely accessing unique_id

    console.log(uniqueId, "unique_id");
    
  return (
    <div>
        <SuccessfulPage unique_Id={uniqueId}/>
    </div>
  )
}

export default page