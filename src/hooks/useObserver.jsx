import { useEffect, useState } from 'react'

export const useObserver = (ref, options) => {
  const { rootMargin } = options
  const [observerEntry, setObserverEntry] = useState(null)

  useEffect(() => {
    if (!ref?.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setObserverEntry(entry)
      },
      { rootMargin }
    )
    ref.current.forEach((section) => observer.observe(section))
  }, [ref, rootMargin])

  return observerEntry
}
