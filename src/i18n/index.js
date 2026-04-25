import { createContext, useContext, useState, useEffect } from 'react'
import en from './en'
import fr from './fr'
import es from './es'

const TRANSLATIONS = { en, fr, es }

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('portfolio_lang') ?? 'en' }
    catch { return 'en' }
  })

  useEffect(() => {
    try { localStorage.setItem('portfolio_lang', lang) }
    catch {}
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
