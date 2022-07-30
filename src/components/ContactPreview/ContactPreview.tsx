import { Contact } from "../../models/Contact/Contact";

//@ts-ignores
import { getImageUrl } from "../../services/util.service.js";

interface ContactPreviewProps {
  contact: Contact;
  func?: Function;
}

export const ContactPreview = (props: ContactPreviewProps): JSX.Element => {
  return (
    <li className="chat-preview flex" onClick={() => props.func && props.func()}>
      <img className="chat-preview-profile" src={getImageUrl(props.contact.img)} alt="profile" />
      <div className="chat-preview-desc flex column full-grow">
        <div className="flex space-between align-center">
          <span className="chat-preview-desc-contact">{props.contact.displayname}</span>
          <span className="chat-preview-desc-resp">12:28</span>
        </div>
        <span className="chat-preview-desc-last">{props.contact.status}</span>
      </div>
    </li>
  );
};
