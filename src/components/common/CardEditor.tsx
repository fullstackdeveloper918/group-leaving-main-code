import React from 'react'
import EditorModal from './EditorModal'
import Custom from './custom'
import CustomEditior from './CustomEditior'

const CardEditor = () => {
  return (
    <div style={{float:"left", width:"100%", display:"flex", flexDirection:"column"}
    }>
    {/* <EditorModal /> */}
     <Custom />
     {/* <CustomEditior /> */}
     </div>
  )
}

export default CardEditor