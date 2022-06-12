import { useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { firebaseAuth } from "./services/firebase.service";
import { saveLocalUser } from "./services/auth.service";
import { getUserByPhoneNum, userService } from "./services/user.service";

import { ChatList } from "./components/ChatList";
import { ProfileHeader } from "./components/ProfileHeader";
import { MainChat } from "./components/MainChat";
import { ChatHeader } from "./components/ChatHeader";
import { KeyBoard } from "./components/Keyboard";
import { EmojiList } from "./components/emoji/EmojiList/EmojiList";
import { Registration } from "./pages/Registration";
import { EmojiModal } from "./components/emoji/EmojiModal";
import { SearchContact } from "./components/SearchContact";
import { OverLayModal } from "./components/OverLayModal/OverLayModal";
const queryClient = new QueryClient();

export const App = () => {
  const [logInUser, setLogInUser] = useState(null);
  const [isAddContact, setIsAddContact] = useState(false);
  const { auth, onAuthStateChanged } = firebaseAuth;
  const num = 0;
  onAuthStateChanged(auth, async (user) => {
    if (user && !logInUser) {
      const { displayName, phoneNumber } = user;
      const logInUserFromDb = await getUserByPhoneNum(phoneNumber);
      const userFormat = userService.getEmptyUser(displayName, phoneNumber);
      const getUser = saveLocalUser(logInUserFromDb ? logInUserFromDb : userFormat);
      setLogInUser(logInUserFromDb ? logInUserFromDb : getUser);
      return;
    }

    return () => setLogInUser();
  });

  return (
    <QueryClientProvider client={queryClient}>
      {logInUser ? (
        <div className="App flex">
          <div className="left-side flex column">
            <OverLayModal />
            <ProfileHeader setIsAddContact={setIsAddContact} />
            <SearchContact />
            <ChatList isAddContact={isAddContact} />
          </div>
          <div className="right-side flex column">
            <ChatHeader />
            <MainChat />
            <EmojiList />
            <KeyBoard />
          </div>
          <EmojiModal />
        </div>
      ) : (
        <Registration />
      )}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
};
