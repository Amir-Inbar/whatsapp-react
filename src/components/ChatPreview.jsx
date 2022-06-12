import { getImageUrl } from "../services/util.service";
import { eventBusService } from "../services/eventBus.service";
import { useQuery } from "react-query";
import { useAddChat, useLoadContacts } from "../hooks/useChatData";

export const ChatPreview = (props) => {
  const { data, isSuccess } = useQuery("loadingContacts", useLoadContacts(props.chat));
  const { mutate: AddChat } = useAddChat();

  const ChatDetails = (props) => {
    return (
      <div className="chat-preview-desc flex column full-grow">
        <div className="flex space-between align-center">
          <span className="chat-preview-desc-contact">{props.user.displayname}</span>
          <span className="chat-preview-desc-resp">12:28</span>
        </div>
        <span className="chat-preview-desc-last">היי אמיר מה קורה?</span>
      </div>
    );
  };

  const handleAddChat = (contact) => {
    AddChat(contact);
  };

  return (
    <>
      {isSuccess &&
        data.map((contact) => (
          <li
            className="chat-preview flex"
            key={contact._id}
            onClick={() => eventBusService.emit("setSelectedChat", props.chat._id)}
          >
            <img className="chat-preview-profile" src={getImageUrl(contact.img)} alt="profile" />
            <ChatDetails user={contact} />
          </li>
        ))}
    </>
  );
};
