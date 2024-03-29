import { lazy, Suspense, useState, createContext } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from "react-query/devtools";
import { firebaseAuth } from './services/firebase.service'
import { saveLocalUser } from './services/auth.service'
import { getUserByPhoneNum, userService } from './services/user.service'

import { ProfileHeader } from './components/ProfileHeader'
import { MainChat } from './components/MainChat'
import { ChatHeader } from './components/ChatHeader'
import { KeyBoard } from './components/Keyboard'
import { EmojiList } from './components/emoji/EmojiList/EmojiList'
import { Registration } from './pages/Registration'
import { EmojiModal } from './components/emoji/EmojiModal'
import { SearchContact } from './components/SearchContact'
import { SideModal } from './components/SideModal/SideModal'
import { DialogModal } from './components/DialogModal/DialogModal'
// const ChatList = lazy(() => import('./components/ChatList').then((module) => ({ default: module.ChatList })))
import { ChatList } from './components/ChatList'
import { DefaultMsg } from './components/DefualtMsg'
import { eventBusService } from './services/eventBus.service'
const queryClient = new QueryClient()
export const UserContext = createContext()

export const App = () => {
  const [logInUser, setLogInUser] = useState(null)
  const [toggleEmojiModal, setToggleEmojiModal] = useState(false)


  const { auth, onAuthStateChanged } = firebaseAuth
  onAuthStateChanged(auth, async (user) => {
    if (user && !logInUser) {
      const { displayName, phoneNumber } = user
      const logInUserFromDb = await getUserByPhoneNum(phoneNumber)
      const userFormat = userService.getEmptyUser(displayName, phoneNumber)
      const getUser = saveLocalUser(logInUserFromDb ? logInUserFromDb : userFormat)
      setLogInUser(logInUserFromDb ? logInUserFromDb : getUser)
      return
    }

    return () => setLogInUser()
  })

  eventBusService.on('toggleEmojiModal', () => setToggleEmojiModal(!toggleEmojiModal))


  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={logInUser}>
        {logInUser ? (
          <div className="App flex">
            <DialogModal />
            <div className="left-side flex column">
              <SideModal />
              <ProfileHeader />
              <SearchContact />
              <ChatList />
            </div>
            <div className="right-side flex column">
              <ChatHeader />
              <MainChat />
              {toggleEmojiModal && <EmojiList />}
              <KeyBoard />
              <DefaultMsg />
            </div>
            <EmojiModal />
          </div>
        ) : (
          <Registration />
        )}
      </UserContext.Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-left" /> */}
    </QueryClientProvider>
  )
}
