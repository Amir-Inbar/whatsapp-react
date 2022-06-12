import React from "react";
import { useQuery } from "react-query";
//@ts-ignore
import { getEmojiFileNames } from "../../../services/chat.service.js"
//@ts-ignore
import { eventBusService } from "../../../services/eventBus.service";
//@ts-ignore
import { getImageUrl } from "../../../services/util.service";

interface Props {
    elEmojiGroups:any; // ask stav
}

interface EmojiFiles {
  [key: string]:string[] | string | {[key: string]:string[]}
}

export const EmojiPreview = ({ elEmojiGroups }:Props): JSX.Element | null=> {
  const { isLoading ,data }:{isLoading:boolean,data:any} = useQuery<EmojiFiles>("emojiNames", getEmojiFileNames)

  const checkGroup = (groupName:string, path:string, ev:React.MouseEvent<HTMLImageElement>) => {
    const idx = path.indexOf("_");
    const key = Object.keys(data[groupName]).filter(
      (key) => key === path.slice(0, idx) || key.includes(path.slice(0, idx))
    )[0];
    if (data[groupName][key]) {
      eventBusService.emit("setEmojiModal", {
        data: [path, ...data[groupName][key]],
        pos: (ev.target as HTMLElement).getBoundingClientRect(),
      });
    } else {
    }
  };

  return (
    <section className="emoji-preview">
      <div className="emoji-body-main">
        <div className="category">Recent</div>
        {!isLoading &&
          Object.entries(data).map(([groupName, value], idx) => (
            <div key={groupName} className="emoji-group">
              <div
                data-section-number={idx}
                className="category"
                key={groupName}
                id={`section-${idx}`}
                ref={(el:HTMLDivElement) => (elEmojiGroups.current?.length < 9 ? elEmojiGroups.current.push(el) : null)}
              >
                {groupName}
              </div>
              {data[groupName].rest.map((path:string, idx:number) => (
                <img
                  src={getImageUrl(`/emoji/all-emoji/${path}`)}
                  className="emoji-icon"
                  alt={path}
                  onClick={(ev) => checkGroup(groupName, path, ev)}
                  key={idx}
                />
              ))}
            </div>
          ))}
      </div>
    </section>
  );
};
