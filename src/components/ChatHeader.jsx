import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'

import { eventBusService } from '../services/eventBus.service'
import { getUserById } from '../services/user.service'
import { getFormattedTime, getImageUrl } from '../services/util.service'

export const ChatHeader = () => {
  const [contact, setContact] = useState(null)
  const logInUser = useContext(UserContext)
  useEffect(() => {
    eventBusService.on('setSelectedChat', async (chat) => {
      if (chat.participants.length <= 2) {
        const contactId = chat.participants.find((pId) => pId !== logInUser._id)
        const contact = await getUserById(contactId)
        setContact(contact)
      }
    })
  }, [])

  const HeaderBtn = ({ keys }) => {
    return keys.map((k) => <img src={getImageUrl(`/icon/${k}.svg`)} className={k} alt={k} key={k} />)
  }
  return (
    contact && (
      <div className="chat-header flex align-center">
        <div className="profile-img flex align-center">
          <img src={getImageUrl(contact.img)} alt="profile" />
        </div>
        <div className="flex column full-grow">
          <span className="contact-name">{contact.nickname}</span>
          <span className="contact-lastseen">{getFormattedTime(contact.lastseen)}</span>
        </div>
        <div className="header-btns flex">
          <HeaderBtn keys={['search', 'settings']} />
        </div>
      </div>
    )
  )
}
