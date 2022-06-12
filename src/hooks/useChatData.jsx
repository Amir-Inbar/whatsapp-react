import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLoggedinUser } from "../services/auth.service";
import { chatService, getEmptyChat } from "../services/chat.service";
import { addChatToUser, userService } from "../services/user.service";

export const useLoadChats = () => {
  return useQuery("loadChats", () => loadChats());
};

export const useLoadContacts = (chat) => {
  return useQuery("loadingContacts", () => getChats(chat));
};

export const useAddChat = () => {
  const queryClient = useQueryClient();
  return useMutation(postChat, {
    onSuccess: (data) => {
      //   queryClient.invalidateQueries("loadingContacts"); // refetch another query
      queryClient.setQueryData("loadingContacts", (oldContacts) => { // update the cache and post HTTP
        return {
          ...oldContacts,
          data: [...oldContacts, data.data],
        };
      });
    },
  });
};

const loadChats = async () => {
  const logInUser = getLoggedinUser();
  if (logInUser.chats.length) {
    return await chatService.query(logInUser.chats);
  }
};

const getChats = async (chat) => {
  const logInUser = getLoggedinUser();
  if (logInUser.chats.length && chat)
    return await userService.getUsersById(chat.participants.filter((p) => p !== logInUser._id));
};

const postChat = async (contact) => {
  const logInUser = getLoggedinUser();
  const emptyChat = getEmptyChat(logInUser._id, contact._id);
  const chat = await postChat(emptyChat);
  logInUser.chats.push(chat.id);
  contact.chats.push(chat.id);
  await addChatToUser(logInUser);
  await addChatToUser(contact);
  return chat;
};
