import { useState } from 'react'
import { eventBusService } from '../services/eventBus.service'
import { getImageUrl } from '../services/util.service'

export const DefaultMsg = () => {
  const [selectedChat, setSelectedChat] = useState()
  
  eventBusService.on('setSelectedChat', (chat) => setSelectedChat(chat._id))

  return (
    !selectedChat && (
      <div className="default-msg flex column full-grow justify-center align-center">
        <img src={getImageUrl('/img/background-nochat.jpg')} alt="" />
        <div className="msg-explanation">
          <h1>Keep your phone connected</h1>
          <p>WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.</p>
          <hr />
          <p>Make calls from desktop with WhatsApp for Windows. Get it here</p>
        </div>
        <div className="default-msg--line"></div>
      </div>
    )
  )
}
