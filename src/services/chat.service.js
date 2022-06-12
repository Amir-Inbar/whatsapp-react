import { makeId, getEmojis } from "./util.service";
import { httpService } from "./http.service";
import { firebaseService } from "./firebase.service";
const API = "chat";
export const chatService = {
  query,
  getChatById,
  sendMsg,
  getEmojiFileNames,
};

export async function query(queries = "") {
  return await firebaseService.queryItems(API, "in", queries);
}

export async function getChatById(chatId, cb) {
  return await firebaseService.getChatById(API, chatId, cb);
}

export async function sendMsg(msg, activeChatId) {
  return await firebaseService.sendMsg(API, msg, activeChatId);
}

export async function postChat(chat) {
  return await firebaseService.saveEntity(API, chat);
}

export function getEmojiFileNames() {
  return getEmojis();
}

export function msgFormat(type = "chat", body, user) {
  const { displayname, _id } = user;
  return {
    id: makeId(),
    type,
    senderId: _id,
    displayname,
    body,
    createdAt: Date.now(),
    status: "send",
  };
}

export function getEmptyChat(args) {
  return { msgs: [], participants: [...args] };
}

export function getEmojiGroupsNames() {
  return [
    "smileys and emotion",
    "people and body",
    "animals and nature",
    "food and drink",
    "travel and places",
    "activities",
    "objects",
    "symbols",
    "flags",
  ];
}

export function getContactById(contactId) {
  return {
    id: "b101",
    number: "0526750033",
    nickname: "רותם קודי",
    img: "/img/2.jpg",
    chats: ["a101", "a102"],
    status: "some generic status",
    lastSeen: Date.now(),
  };
}

export function getEmptyMsg() {
  return {
    id: makeId(),
    type: "chat",
    senderId: null,
    nickName: null,
    body: null,
    createdAt: null,
    status: null,
  };
}
