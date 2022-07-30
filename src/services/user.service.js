import { firebaseService } from "./firebase.service";

const API = "user";
export const userService = {
  getUsersById,
  getEmptyUser,
  getAllUsers,
};

export async function getUsersById(queries = "", operator = "in") {
  return firebaseService.getEntityById(API, "docId", operator, queries);
}

export async function getAllUsers(user) {
  return firebaseService.getEntitys(API, "!=", user);
}

export async function getUserById(userId) {
  const user = await firebaseService.getEntityById(API, "docId",'==',userId);
  return user[0]
}


export async function getUserByPhoneNum(phonenNum) {
  const user = await firebaseService.getEntityById(API, "number", "==", phonenNum);
  return user[0]
}

export async function addChatToUser(user) {
  return await firebaseService.saveEntity(API,user)
}


function getEmptyUser(displayname = "", number) {
  return {
    chats: [],
    img: "",
    displayname,
    number,
    status: "",
  };
}
