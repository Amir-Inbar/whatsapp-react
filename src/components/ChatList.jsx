import { base64Decode, base64Encode } from "@firebase/util";
import { useQuery } from "react-query";
import { useLoadChats } from "../hooks/useChatData";
import { getBase64FromUrl, getImageUrl } from "../services/util.service";

import { ChatPreview } from "./ChatPreview";

export const ChatList = () => {
const {data, isSuccess }= useQuery("loadChats",useLoadChats())

// const TestBase64 = () => {
//   const base64 = base64Encode("/img/1.jpg")
//   const debase64 = base64Decode(base64)
//   return <img src={getImageUrl(debase64)} alt="test" />
// }



  const ChatGroups = () => {
    return data?.map((chat) => <ChatPreview chat={chat} key={chat._id} />);
  };

  return isSuccess && (
    <section className="section-chat-list flex column">
      <ul className="chat-list">
        <ChatGroups />
      </ul>
    </section>
  );
};
