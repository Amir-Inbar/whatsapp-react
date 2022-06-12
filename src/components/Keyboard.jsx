import React, { useState, useEffect, useRef } from "react";

import { chatService, msgFormat } from "../services/chat.service";
import { getImageUrl } from "../services/util.service";
import { authService } from "../services/auth.service";
import { eventBusService } from "../services/eventBus.service";

import { useForm } from "../hooks/useForm";

export const KeyBoard = () => {
  const [logInUser, setLogInUser] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chatInputData, setChatInputData] = useState(null);
  const [inputData, handleElChange, setInputData] = useForm();
  const elKeyBoard = useRef(null);

  eventBusService.on("onSetChatInput", (data) => setChatInputData(data));

  useEffect(() => {
    let abortController = new AbortController();
    eventBusService.on("setSelectedChat", (data) => setActiveChatId(data));
    setLogInUser(authService.getLoggedinUser());

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    (async function () {
      if (inputData?.key === "Enter") {
        eventBusService.on("setSelectedChat", (data) => setActiveChatId(data));
        console.log(inputData.msg);
        const userMsg = msgFormat("chat", inputData.msg, logInUser);
        elKeyBoard.current.innerText = "";
        await chatService.sendMsg(userMsg, activeChatId);
        setInputData();
      }
    })();
  }, [inputData]);

  useEffect(() => {
    if (chatInputData) {
      const strHTML = `<img src=${getImageUrl(`/emoji/all-emoji/${chatInputData}`)}>`;
      elKeyBoard.current.innerHTML += strHTML;
      setInputData((prevFields) => ({ ...prevFields, ["msg"]: prevFields?.msg + chatInputData }));
    }
  }, [chatInputData]);
  return (
    <div className="chat-keyboard">
      <div className="user-keyboard flex align-center ">
        <img
          src={getImageUrl("/icon/emoji.svg")}
          alt="emoji"
          className="search"
          onClick={() => eventBusService.emit("toggleEmojiModal")}
        />
        <img src={getImageUrl("/icon/file.svg")} className="search" alt="search" />
        <div
          suppressContentEditableWarning={true}
          title="Type a message"
          contentEditable="true"
          dir="ltr"
          role="textbox"
          spellCheck="true"
          ref={elKeyBoard}
          type="text"
          data-tab="10"
          className="keyboard-input full-grow"
          placeholder="Type a message"
          name="msg"
          onKeyDown={(ev) => handleElChange(ev, "msg")}
        ></div>
        {inputData && <img src={getImageUrl("/icon/mic.svg")} alt="mic" />}
        {!inputData && <img src={getImageUrl("/icon/arrow-input.svg")} alt="arrow-input" />}
      </div>
    </div>
  );
};
