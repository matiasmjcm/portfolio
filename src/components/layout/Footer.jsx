import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { PERSONAL } from '../../constants'
import { useLang } from '../../i18n'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-bg-primary border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="font-mono text-lg font-semibold gradient-text hover:opacity-80 transition-opacity">
          &lt;matias /&gt;
        </a>

        <p className="text-text-dim text-sm flex items-center gap-1.5">
          {t.footer.built} <FiHeart className="text-accent-pink" size={14} /> {t.footer.using}
        </p>

        <div className="flex items-center gap-6">
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
             className="text-text-dim hover:text-accent-cyan transition-colors" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer"
             className="text-text-dim hover:text-accent-purple transition-colors" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href={`mailto:${PERSONAL.email}`}
             className="text-text-dim hover:text-accent-orange transition-colors" aria-label="Email">
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
