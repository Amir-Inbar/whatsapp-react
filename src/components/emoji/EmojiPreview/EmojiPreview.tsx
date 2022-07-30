import React from 'react'
import { useQuery } from 'react-query'
//@ts-ignore
import { getEmojiFileNames } from '../../../services/chat.service.js'
//@ts-ignore
import { eventBusService } from '../../../services/eventBus.service'
//@ts-ignore
import { getImageUrl } from '../../../services/util.service'

interface Props {
  elEmojiGroups: any // ask stav
  emojis: any
}

interface EmojiFiles {
  [key: string]: string[] | string | { [key: string]: string[] }
}

export const EmojiPreview = ({ elEmojiGroups, emojis }: Props): JSX.Element | null => {

  const checkGroup = (groupName: string, path: string, ev: React.MouseEvent<HTMLImageElement>) => {
    const idx = path.indexOf('_')
    const key = Object.keys(emojis[groupName]).filter(
      (key) => key === path.slice(0, idx) || key.includes(path.slice(0, idx))
    )[0]
    if (emojis[groupName][key]) {
      eventBusService.emit('setEmojiModal', {
        data: [path, ...emojis[groupName][key]],
        pos: (ev.target as HTMLElement).getBoundingClientRect(),
      })
    }
  }


  return (
    <section className="emoji-preview">
      <div className="emoji-body-main">
        <div className="category">Recent</div>
        {Object.entries(emojis).map(([groupName, value], idx) => (
          <div key={groupName} className="emoji-group">
            <div
              data-section-number={idx}
              className="category"
              key={groupName}
              id={`section-${idx}`}
              ref={(el: HTMLDivElement) => (elEmojiGroups.current.length < 9 ? elEmojiGroups.current.push(el) : null)}
            >
              {groupName}
            </div>
            {emojis[groupName].rest.map((path: string, idx: number) => (
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
  )
}
