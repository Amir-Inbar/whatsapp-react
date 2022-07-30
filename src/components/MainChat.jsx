import React, { useState, useRef, useLayoutEffect } from 'react'

import { chatService } from '../services/chat.service'
import { formatTime } from '../services/util.service'
import { eventBusService } from '../services/eventBus.service'

import { getLoggedinUser } from '../services/auth.service'

export const MainChat = () => {
  const [logInUser, setLogInUser] = useState(null)
  const [selectChat, setSelectChat] = useState(null)
  const [activeChatId, setActiveChatId] = useState(null)
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
  const elScroller = useRef(null)

  eventBusService.on('toggleEmojiModal', () => {
    setIsEmojiModalOpen(!isEmojiModalOpen)
  })

  useLayoutEffect(() => {
    pageScroll()
  }, [isEmojiModalOpen])

  useLayoutEffect(() => {
    let abortController = new AbortController()
    eventBusService.on('setSelectedChat', (chat) => setActiveChatId(chat._id))
    if (activeChatId) {
      chatService.getChatById(activeChatId, (data) => {
        if (data) {
          setSelectChat(data)
        }
      })
    }

    if (!logInUser) setLogInUser(getLoggedinUser())

    return () => abortController.abort()
  }, [activeChatId])

  useLayoutEffect(() => {
    if (elScroller.current) pageScroll()
  }, [selectChat])

  const pageScroll = () => {
    if (elScroller.current) elScroller.current.scrollBy(0, 250)
  }

  const calcAlign = (msg) => {
    return logInUser._id === msg.senderId ? 'flex-end' : 'flex-start'
  }

  return (
    selectChat && (
      <div
        className="main-chat flex column"
        ref={elScroller}
        style={{
          marginBottom: !isEmojiModalOpen ? '62px' : '0px',
          overflowY: selectChat ? 'scroll' : 'hidden',
        }}
      >
        {selectChat.msgs.map((msg) => (
          <article className="chat-list flex column" style={{ alignItems: calcAlign(msg) }} key={msg.id}>
            <div className={`message flex column ${logInUser._id === msg.senderId ? 'msg-by-me' : 'msg-by-other'}`}>
              <span className={`${logInUser._id === msg.senderId ? 'msg-triangle' : 'msg-triangle1'}`}></span>
              <span dangerouslySetInnerHTML={{ __html: msg.body }} className="inner-message" />
              <div
                className="send-at"
                style={{ alignSelf: logInUser._id === msg.senderId ? 'flex-start' : 'flex-end' }}
              >
                {formatTime(msg.createdAt)}
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  )
}
