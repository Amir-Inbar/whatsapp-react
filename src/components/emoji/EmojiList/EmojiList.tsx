import { useRef, useEffect } from 'react'
//@ts-ignore
import { useObserver } from '../../../hooks/useObserver'
//@ts-ignore
//@ts-ignore
import { getEmojiFileNames } from '../../../services/chat.service.js'
import { EmojiHeader } from '../EmojiHeader/EmojiHeader'
import { EmojiPreview } from '../EmojiPreview/EmojiPreview'
//@ts-ignore
// import { EmojiSearch } from "./EmojiSearch";

interface useRefEmojis {
  elEmojiHeader: HTMLAnchorElement[]
  elEmojiGroups: HTMLDivElement[]
  elEmojiLine: HTMLSpanElement
}

export const EmojiList = () => {
  const elEmojiHeader = useRef<useRefEmojis['elEmojiHeader']>([])
  const elEmojiLine = useRef<useRefEmojis['elEmojiLine']>(null!)
  const elEmojiGroups = useRef<useRefEmojis['elEmojiGroups']>([])
  const entry = useObserver(elEmojiGroups, { rootMargin: '0px' })
  const emojis = getEmojiFileNames()

  useEffect(() => {
    if (!entry) return
    if (entry.isIntersecting) {
      const sectionNumber = +(entry.target.getAttribute('data-section-number') || 0)
      const emojiHeaderWidth = Array.isArray(elEmojiHeader.current) ? elEmojiHeader.current[0].offsetWidth : 0
      if (elEmojiLine.current) {
        elEmojiLine.current.style.transform = `translateX(${sectionNumber * emojiHeaderWidth}px)`
      }
    }
  }, [entry])

  return (
    <div className="emoji-popup">
      <div className="emoji-body flex column full-grow">
        <EmojiHeader elEmojiHeader={elEmojiHeader} elEmojiLine={elEmojiLine} />
        <EmojiPreview elEmojiGroups={elEmojiGroups} emojis={emojis} />
      </div>
    </div>
  )
}
