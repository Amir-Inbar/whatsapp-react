import React, { useState } from "react";
import { useQuery } from "react-query";

import { eventBusService } from "../services/eventBus.service";
import { getImageUrl } from "../services/util.service";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { getLoggedinUser, logout } from "../services/auth.service";
import { useLoadChats } from "../hooks/useChatData";

import { CustomInput } from "../components/CustomInput/CustomInput";

const ContactParticipants = ({ contacts }) => {
  const [isSearching, setIsSearching] = useState(false);

  const toggleBtn = () => {
    return isSearching ? "arrow" : "search";
  };

  const style = () => {
    return { paddingInlineStart: "65px" };
  };

  return (
    <main name="new-contact" className="contact flex column">
      <div className="contact-search">
        <CustomInput placeholder="Search contacts" type="text" style={style()} />
        <img
          src={getImageUrl(`/icon/${toggleBtn()}.svg`)}
          onClick={() => setIsSearching(!isSearching)}
          className={"contact-search__img " + toggleBtn()}
          alt="search"
        />
      </div>
      <div className="contact__group flex justify-start align-center">
        <img src={getImageUrl("/icon/add-group.svg")} alt="group" className="contact__group--img" />
        <span className="contact__group--title">New Group</span>
      </div>
      {contacts.map((contact) => (
        <div className="contact__preview" key={contact._id}>
          <img src={contact.img} alt="profile" />
          <div className="contact__preview">
            <span className="contact__name"></span>
            <span className="contact__status"></span>
          </div>
        </div>
      ))}
    </main>
  );
};

const Settings = () => {
  const logInUser = getLoggedinUser();
  const settingsNames = [
    "notification",
    "privacy",
    "security",
    "theme",
    "chat-wallpaper",
    "request-account-info",
    "keyboard-shortcuts",
    "help",
  ];
  return (
    <main name="settings" className="settings">
      <div className="settings__main flex">
        <img src={getImageUrl(logInUser.img)} alt="" className="settings__main--img" />
        <div className="flex column justify-center">
          <span>{logInUser.displayname}</span>
          <span>{logInUser.status}</span>
        </div>
      </div>
      {settingsNames.map((iconName) => {
        return (
          <div className="settings__icon flex align-center" key={iconName}>
            <img className="settings__icon--img" src={getImageUrl(`/icon/settings/${iconName}.svg`)} alt={iconName} />
            <span className="settings__icon--title">{iconName[0].toUpperCase() + iconName.slice(1)}</span>
          </div>
        );
      })}
    </main>
  );
};

export const ProfileHeader = () => {
  const [logInUser, setLogInUser] = useState(getLoggedinUser());
  const [modalStyle, setModalStyle] = useState({ display: "none" });
  const { data: contacts, isSuccess, refetch } = useQuery("loadChats", useLoadChats(), { enabled: false });

  const handleClickOutside = () => setModalStyle({ display: "none" });
  const ref = useOutsideClick(handleClickOutside);

  const handleInsideClick = (ev) => {
    const pos = ev.target.getBoundingClientRect();
    setModalStyle({
      top: `${pos.top + 30}px`,
      left: `${pos.left - 194 + 25}px`,
    });
  };
  const setTask = async (taskName) => {
    if (taskName === "LogOut") logout();
    if (taskName.toLowerCase() === "settings") {
      eventBusService.emit("setSideModal", { children: <Settings />, key: taskName.toLowerCase() });
    }
    if (taskName.toLowerCase() === "new contact") {
      await refetch();
      eventBusService.emit("setSideModal", {
        children: <ContactParticipants contacts={contacts} />,
        key: taskName.toLowerCase(),
      });
    }
  };

  const settingsNames = () => {
    return ["New group", "Archived", "Starred messages", "Settings", "LogOut"];
  };
  return (
    logInUser && (
      <div className="profile-header flex">
        <div className="profile-img flex align-center">
          <img src={getImageUrl(logInUser.img)} alt="profile" />
        </div>
        <div className="header-features flex align-center">
          <img src={getImageUrl("/icon/status.svg")} alt="status" />
          <img src={getImageUrl("/icon/new-chat.svg")} alt="new-chat" onClick={() => setTask("new contact")} />
          <img src={getImageUrl("/icon/settings.svg")} onClick={(ev) => handleInsideClick(ev)} alt="settings" />
        </div>
        <div className="settings-modal flex column" ref={ref} style={modalStyle}>
          {settingsNames().map((name, idx) => (
            <div key={idx} onClick={() => setTask(name)}>
              {name}
            </div>
          ))}
        </div>
      </div>
    )
  );
};
