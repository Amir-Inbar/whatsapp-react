import React, { useState, useLayoutEffect,useRef } from "react";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { eventBusService } from "../../services/eventBus.service";
import { getImageUrl } from "../../services/util.service";

export const EmojiModal = () => {
  const [modalPos, setModalPos] = useState({ display: "none" });
  const [emojiModal, setEmojiModal] = useState(null);
  const ref = useRef()

  eventBusService.on("setEmojiModal", (data) => setEmojiModal(data));

  const outSideClick = () => {
    setModalPos({ display: "none" });
  };
  useOutsideClick(ref,()=>outSideClick());

  useLayoutEffect(() => {
    if (emojiModal) {
      const { pos } = emojiModal;
      const left =
        pos.x + 254 - 10 < window.innerWidth ? pos.x - 10 : window.innerWidth - (window.innerWidth - pos.x + 254 - 60);
      const style = {
        top: `${pos.top - 5 - pos.height * 2}px`,
        left: `${left}px`,
      };
      setModalPos(style);
    }
  }, [emojiModal]);

  const onSetChatInput = (emoji) => {
    eventBusService.emit("onSetChatInput", emoji)
    outSideClick()
  }

  return (
    <>
      {emojiModal && (
        <article className="group-selection flex" ref={ref} style={modalPos}>
          {emojiModal.data.map((emoji, idx) => (
            <img
              src={getImageUrl(`/emoji/all-emoji/${emoji}`)}
              alt={emoji}
              className="emoji-icon"
              key={idx}
              onClick={() =>onSetChatInput(emoji) }
            />
          ))}
          <span
            style={{
              left: emojiModal.pos.x + 254 - 10 < window.innerWidth ? "22px" : "205px",
            }}
            className="triangle"
          ></span>
        </article>
      )}
    </>
  );
};
