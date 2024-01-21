import React from 'react'
import {ChatEngine} from 'react-chat-engine'
const SupportAdmin = () => {
  return (
   <ChatEngine
   projectID ={import.meta.env.VITE_CE_PROJECT_ID}
   userName = 'Faizu Rahman'
   userSecret = 'Faizu123#'
        height='calc(100vh - 20px)'
   />
  )
}

export default SupportAdmin
