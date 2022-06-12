import React, { useEffect, useState } from "react";

import { getContactById } from "../services/chat.service";
import { getFormattedTime, getImageUrl } from "../services/util.service";

export const ChatHeader = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const currContact = getContactById();
    setContact(currContact);
  }, []);
  return contact &&  (
    <div className="chat-header flex align-center">
      <div className="profile-img flex align-center">
        <img src={getImageUrl(contact.img)} alt="profile" />
      </div>
      <div className="flex column full-grow">
        <span className="contact-name">{contact.nickname}</span>
        <span className="contact-lastseen">last seen today at:{getFormattedTime(contact.lastSeen)}</span>
      </div>
      <div className="header-btns flex">
        <img src={getImageUrl("/icon/search.svg")} className="search" />
        <img src={getImageUrl("/icon/settings.svg")} className="search" />
      </div>
    </div>
  );
};
