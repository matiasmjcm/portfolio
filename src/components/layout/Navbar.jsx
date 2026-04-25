import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGithub } from 'react-icons/fi'
import { PERSONAL } from '../../constants'
import { useLang } from '../../i18n'

const NAV_KEYS = ['about', 'skills', 'projects', 'education', 'contact']
const NAV_HREFS = {
  about: '#about', skills: '#skills', projects: '#projects',
  education: '#education', contact: '#contact',
}

const LANGS = [
  { code: 'en', flag: '🇬🇧' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'es', flag: '🇵🇪' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [isScrolled,    setIsScrolled]    = useState(false)
  const [isMobileOpen,  setIsMobileOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50)
      for (const key of [...NAV_KEYS].reverse()) {
        const el = document.getElementById(key)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(key)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a href="#" className="font-mono text-lg font-semibold gradient-text hover:opacity-80 transition-opacity shrink-0">
          &lt;matias /&gt;
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_KEYS.map(key => (
            <li key={key}>
              <a
                href={NAV_HREFS[key]}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent-cyan ${
                  activeSection === key ? 'text-accent-cyan' : 'text-text-muted'
                }`}
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-0.5 bg-bg-tertiary rounded-full p-1">
            {LANGS.map(({ code, flag }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2 py-1 rounded-full text-sm transition-all duration-200 ${
                  lang === code
                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40'
                    : 'text-text-dim hover:text-text-muted'
                }`}
                aria-label={code.toUpperCase()}
              >
                {flag}
              </button>
            ))}
          </div>

          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-cyan transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
          <a href="#contact" className="btn-primary text-sm px-5 py-2">
            {t.nav.hire}
          </a>
        </div>

        <button
          onClick={() => setIsMobileOpen(o => !o)}
          className="md:hidden text-text-muted hover:text-accent-cyan transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-secondary border-b border-white/5 px-6 py-5"
          >
            <ul className="flex flex-col gap-5 mb-5">
              {NAV_KEYS.map(key => (
                <li key={key}>
                  <a
                    href={NAV_HREFS[key]}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-text-muted hover:text-accent-cyan transition-colors font-medium"
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-0.5 bg-bg-tertiary rounded-full p-1 w-fit">
              {LANGS.map(({ code, flag }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    lang === code
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40'
                      : 'text-text-dim hover:text-text-muted'
                  }`}
                >
                  {flag} {code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
