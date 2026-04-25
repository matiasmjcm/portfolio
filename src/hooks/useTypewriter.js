import { useState, useEffect } from 'react'

export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, pauseDelay = 1800) {
  const [index,    setIndex]    = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused,   setPaused]   = useState(false)

  // reset when language changes (words array reference changes)
  useEffect(() => {
    setIndex(0)
    setSubIndex(0)
    setDeleting(false)
    setPaused(false)
  }, [words])

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true) }, pauseDelay)
      return () => clearTimeout(t)
    }

    const word = words[index]

    if (!deleting && subIndex === word.length) {
      setPaused(true)
      return
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % words.length)
      return
    }

    const t = setTimeout(
      () => setSubIndex(s => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed
    )
    return () => clearTimeout(t)
  }, [subIndex, deleting, paused, index, words, typeSpeed, deleteSpeed, pauseDelay])

  return words[index].slice(0, subIndex)
}
