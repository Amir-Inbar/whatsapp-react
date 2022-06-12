import React, {useState, useRef } from "react";
//@ts-ignore
import { eventBusService } from "../../../services/eventBus.service";
import { EmojiHeader } from "../EmojiHeader/EmojiHeader";
import { EmojiPreview } from "../EmojiPreview/EmojiPreview";
//@ts-ignore
// import { EmojiSearch } from "./EmojiSearch";

interface useRefEmojis {
  elEmojiHeader:HTMLAnchorElement[];
  elEmojiGroups:HTMLDivElement[];
  elEmojiLine:HTMLSpanElement;
}

export const EmojiList = () => {
  const [toggleEmojiModal, setToggleEmojiModal] = useState(false);
  const elEmojiHeader = useRef<useRefEmojis["elEmojiHeader"]>([]);
  const elEmojiGroups = useRef<useRefEmojis["elEmojiGroups"]>([]);
  const elEmojiLine = useRef<useRefEmojis["elEmojiLine"]>(null!);

  var observer = new IntersectionObserver(onIntersection, { rootMargin: "0px" }); 
  eventBusService.on("toggleEmojiModal", () => setToggleEmojiModal(!toggleEmojiModal));

  function onIntersection(entries:IntersectionObserverEntry[]):void {
           (entries || []).forEach((entry:IntersectionObserverEntry) => {
              if (entry.isIntersecting) {
                  const sectionNumber = +(entry.target.getAttribute("data-section-number") || 0);
                  const emojiHeaderWidth = Array.isArray(elEmojiHeader.current) ? elEmojiHeader.current[0].offsetWidth :0; 
                  if(elEmojiLine.current) elEmojiLine.current.style.transform = `translateX(${sectionNumber * emojiHeaderWidth}px)`
              }
            });
  }
    (elEmojiGroups.current as HTMLDivElement[] ).forEach((section:HTMLDivElement) => observer.observe(section))

  return (
    toggleEmojiModal && (
      <div className="emoji-popup">
        <div className="emoji-body flex column full-grow">
          <EmojiHeader elEmojiHeader={elEmojiHeader} elEmojiLine={elEmojiLine} />
          {/* <EmojiSearch /> */}
          <EmojiPreview elEmojiGroups={elEmojiGroups} />
        </div>
      </div>
    )
  );
};
