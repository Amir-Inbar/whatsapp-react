import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLoggedinUser, saveLocalUser } from "../services/auth.service";
import { addContactToChat, chatService, getEmptyChat } from "../services/chat.service";
import { eventBusService } from "../services/eventBus.service";
import { addChatToUser, getAllUsers, userService } from "../services/user.service";

export const UseLoadChats = () => {
  return useQuery("loadChats", loadUserChats,{cacheTime:2^53,refetchOnWindowFocus:false});
};

export const UseLoadParticipants = (chat) => {
  return useQuery(["preview", chat._id], () => getUserParticipant(chat),{refetchOnWindowFocus:false});
};

export const UseLoadDBContact = () => {
  return useQuery("dbContact",()=>getContacts(),{refetchOnWindowFocus:false})
}

const getContacts = async() => {
  const logInUser = getLoggedinUser();
 return await getAllUsers(logInUser._id)
}

export const useAddChat = () => {
  const queryClient = useQueryClient();
   return useMutation(postChat, {
    onSuccess: (data) => {
      //   queryClient.invalidateQueries("loadingContacts"); // refetch another query
      queryClient.setQueryData("loadChats", (oldContacts) => {
        // update the cache and post HTTP
        return [...oldContacts,data]
          // data: [...oldContacts, data],
      });
    },
  });
};

const loadUserChats = async () => {
  const logInUser = getLoggedinUser();
  if (logInUser.chats.length) {
    return await chatService.query(logInUser.chats);
  }
};

const getUserParticipant = async (chat) => {
  const logInUser = getLoggedinUser();
  if ( chat.participants) {
    return await userService.getUsersById(chat.participants?.filter((p) => p !== logInUser._id));
  }
};

const postChat = async (contact) => {
  const logInUser = getLoggedinUser();
  const emptyChat = getEmptyChat(logInUser._id, contact._id);
  const chat = await addContactToChat(emptyChat);
  logInUser.chats.push(chat.id);
  contact.chats.push(chat.id);
  saveLocalUser(logInUser)
  await addChatToUser(logInUser);
  await addChatToUser(contact);
  eventBusService.emit("setSelectedChat",chat.id)
  return {"_id":chat.id,...emptyChat};
};
