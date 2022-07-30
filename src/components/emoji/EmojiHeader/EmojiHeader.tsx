//@ts-ignore
import { getEmojiGroupsNames } from "../../../services/chat.service.js";
//@ts-ignore
import { getImageUrl } from "../../../services/util.service";

interface Props {
    elEmojiHeader:React.MutableRefObject<HTMLAnchorElement[]>;
    elEmojiLine:React.MutableRefObject<HTMLSpanElement>;
}


export const EmojiHeader = ({elEmojiHeader, elEmojiLine }: Props): JSX.Element | null => {

//@ts-ignore
  const groups = getEmojiGroupsNames()

  return (
    <div className="emoji-header">
      <header className="emoji-category flex justify-center">
        {groups.map((_: any, idx: number) => (
          <a
            href={`#section-${idx}`}
            ref={(el:HTMLAnchorElement) =>elEmojiHeader.current && ((elEmojiHeader.current).length < 9 ? elEmojiHeader.current.push(el) : null)}
            data-section-number={idx}
            className="emoji flex column align-center justify-center"
            onClick={() =>
              elEmojiLine.current && (elEmojiLine.current.style.transform = `translateX(${idx * elEmojiLine.current.offsetWidth}px)`)
            }
            key={idx}
          >
            <img src={getImageUrl(`/emoji/icon${idx + 1}.svg`)} key={idx} />
          </a>
        ))}
        {<span className="border" ref={elEmojiLine}></span>}
      </header>
    </div>
  );
};
