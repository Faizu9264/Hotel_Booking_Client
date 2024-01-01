import React from 'react'
import {ChatEngine,ChatSocket} from 'react-chat-engine'
const SupportAdmin = () => {
  return (
   <ChatEngine
   projectID ={import.meta.env.VITE_CE_PROJECT_ID}
   userName = 'Faizu Rahman'
   userSecret = 'Faizu123#'
            // chatID={222487}  
            //   chatAccessKey={'ca-ab73bab4-aff9-4a03-bfe7-c9ee5ca73bb8'}
            //   senderUsername={"Faizu Rahman"|| ''}
        height='calc(100vh - 20px)'
   />
  )
}

export default SupportAdmin
