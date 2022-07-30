import { UseLoadChats } from '../hooks/useChatData'
import { ChatLoader } from './ChatLoader/ChatLoader'

import { ChatPreview } from './ChatPreview'

export const ChatList = () => {
  const { data, isSuccess } = UseLoadChats()

  const ChatGroups = (props) => {
    return props.chats?.map((chat) => {
      return <ChatPreview chat={chat} key={chat._id} />
    })
  }
  return (
    <section className="section-chat-list flex column">
      <ul className="chat-list">
        <ChatLoader type="ChatListLoader">
          <ChatGroups chats={data} isSuccess={isSuccess} />
        </ChatLoader>
      </ul>
    </section>
  )
}
