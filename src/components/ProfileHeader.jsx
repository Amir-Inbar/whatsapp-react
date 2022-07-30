import React, { useState, useRef } from 'react'

import { eventBusService } from '../services/eventBus.service'
import { getImageUrl } from '../services/util.service'

import { useOutsideClick } from '../hooks/useOutsideClick'
import { logout } from '../services/auth.service'
import { useAddChat, UseLoadDBContact } from '../hooks/useChatData'

import { CustomInput } from '../components/CustomInput/CustomInput'
import { ContactPreview } from './ContactPreview/ContactPreview'
import { useContext } from 'react'
import { UserContext } from '../App'

const ChatParticipants = () => {
  const { data: chats } = UseLoadDBContact()
  const [isSearching, setIsSearching] = useState(false)
  const logInUser = useContext(UserContext)
  const toggleBtn = () => {
    return isSearching ? 'arrow' : 'search'
  }

  const style = () => {
    return { paddingInlineStart: '65px' }
  }
  const { mutate: addChat } = useAddChat()

  const onAddChat = (contact) => {
    const chatId = logInUser.chats.find((chatId) => contact.chats.includes(chatId))
    if(chatId){
      eventBusService.emit("setSelectedChat", chatId)
      return
    }
    addChat(contact)
  }

  return (
    <main name="new-contact" className="contact flex column">
      <div className="contact-search">
        <CustomInput placeholder="Search contacts" type="text" style={style()} />
        <img
          src={getImageUrl(`/icon/${toggleBtn()}.svg`)}
          onClick={() => setIsSearching(!isSearching)}
          className={'contact-search__img ' + toggleBtn()}
          alt="search"
        />
      </div>
      <div className="contact__group flex justify-start align-center">
        <img src={getImageUrl('/icon/add-group.svg')} alt="group" className="contact__group--img" />
        <span className="contact__group--title">New Group</span>
      </div>
      {chats &&
        chats.map((contact) => <ContactPreview contact={contact} key={contact._id} func={() => onAddChat(contact)} />)}
    </main>
  )
}

const Settings = () => {
  const logInUser = useContext(UserContext)

  const settingsNames = [
    'notification',
    'privacy',
    'security',
    'theme',
    'chat-wallpaper',
    'request-account-info',
    'keyboard-shortcuts',
    'help',
  ]

  const onSetDialog = (settingName) => {
    if (settingName === 'theme') {
      eventBusService.emit('openDialogModal', settingName)
    }
  }

  return logInUser && (
    <main name="settings" className="settings">
      <div className="settings__main flex">
        <img src={getImageUrl(logInUser.img)} alt="" className="settings__main--img" />
        <div className="flex column justify-center">
          <span>{logInUser.displayname}</span>
          <span>{logInUser.status}</span>
        </div>
      </div>
      {settingsNames.map((settingName) => (
        <div className="settings__icon flex align-center" key={settingName} onClick={() => onSetDialog(settingName)}>
          <img
            className="settings__icon--img"
            src={getImageUrl(`/icon/settings/${settingName}.svg`)}
            alt={settingName}
          />
          <span className="settings__icon--title">{settingName[0].toUpperCase() + settingName.slice(1)}</span>
        </div>
      ))}
    </main>
  )
}

export const ProfileHeader = () => {
  const logInUser = useContext(UserContext)
  const [modalStyle, setModalStyle] = useState({ display: 'none' })
  const ref = useRef()
  const handleClickOutside = () => {
    setModalStyle({ display: 'none' })
  }

  useOutsideClick(ref, () => handleClickOutside())

  const handleInsideClick = (ev) => {
    const pos = ev.target.getBoundingClientRect()
    setModalStyle({
      top: `${pos.top + 30}px`,
      left: `${pos.left - 194 + 25}px`,
    })
  }

  const setTask = async (taskName) => {
    console.log(logInUser);
    if (taskName === 'LogOut') logout(logInUser)
    if (taskName.toLowerCase() === 'settings') {
      eventBusService.emit('setSideModal', { children: <Settings />, key: taskName.toLowerCase() })
    }
    if (taskName.toLowerCase() === 'new contact') {
      eventBusService.emit('setSideModal', {
        children: <ChatParticipants />,
        key: taskName.toLowerCase(),
      })
    }
    setModalStyle({ display: 'none' })
  }

  const settingsNames = () => {
    return ['New group', 'Archived', 'Starred messages', 'Settings', 'LogOut']
  }

  return (
    logInUser && (
      <div className="profile-header flex">
        <div className="profile-img flex align-center">
          <img src={getImageUrl(logInUser.img)} alt="profile" />
        </div>
        <div className="header-features flex align-center">
          <img src={getImageUrl('/icon/status.svg')} alt="status" />
          <img src={getImageUrl('/icon/new-chat.svg')} alt="new-chat" onClick={() => setTask('new contact')} />
          <img src={getImageUrl('/icon/settings.svg')} onClick={(ev) => handleInsideClick(ev)} alt="settings" />
        </div>
        <div className="settings-modal flex column" ref={ref} style={modalStyle}>
          {settingsNames().map((name, idx) => (
            <div key={idx} onClick={() => setTask(name)}>
              {name}
            </div>
          ))}
        </div>
      </div>
    )
  )
}
