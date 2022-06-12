import React, { useEffect, useState } from "react";

import { eventBusService } from "../services/eventBus.service";
import { getImageUrl } from "../services/util.service";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { getLoggedinUser, logout } from "../services/auth.service";

export const ProfileHeader = () => {
  const [logInUser, setLogInUser] = useState( getLoggedinUser());
  const [modalStyle, setModalStyle] = useState({ display: "none" });

  const handleClickOutside = () => setModalStyle({ display: "none" });
  const ref = useOutsideClick(handleClickOutside);

  const handleInsideClick = (ev) => {
    const pos = ev.target.getBoundingClientRect();
    setModalStyle({
      top: `${pos.top + 30}px`,
      left: `${pos.left - 194 + 25}px`,
    });
  };
  const setTask = (taskName) => {
    if (taskName === "LogOut") logout();
    if (taskName === "New contact") eventBusService.emit("setIsAddContact", true);
  };

  const settingsNames = () => {
    return ["New contact", "Archived", "Starred messages", "Settings", "LogOut"];
  };
  return (
    logInUser && (
      <div className="profile-header flex">
        <div className="profile-img flex align-center">
          <img src={getImageUrl(logInUser.img)} alt="profile" />
        </div>
        <div className="header-features flex align-center">
          <img src={getImageUrl("/icon/status.svg")} />
          <img src={getImageUrl("/icon/new-chat.svg")} />
          <img src={getImageUrl("/icon/settings.svg")} onClick={(ev) => handleInsideClick(ev)} />
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
