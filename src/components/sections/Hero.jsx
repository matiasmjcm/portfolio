import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import { PERSONAL, TYPEWRITER_TITLES } from '../../constants'
import { useTypewriter } from '../../hooks/useTypewriter'

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_TITLES)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 bg-bg-primary pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-accent-cyan/8 blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-accent-purple/8 blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-orange/5 blur-3xl" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto section-padding w-full">
        <div className="max-w-4xl">
          {/* Available badge */}
          {PERSONAL.available && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              Available for opportunities
            </motion.div>
          )}

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-accent-cyan text-lg mb-2"
          >
            Hi there, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-4"
          >
            <span className="gradient-text">Matias</span>
            <br />
            <span className="text-text-primary">Castro</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-1 text-2xl md:text-3xl font-semibold text-text-muted mb-6 h-10"
          >
            <span>{typed}</span>
            <span className="inline-block w-0.5 h-8 bg-accent-cyan animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-text-muted text-lg max-w-2xl mb-10 leading-relaxed"
          >
            {PERSONAL.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6"
          >
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-cyan transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <FiGithub size={24} />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-purple transition-all duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-text-muted hover:text-accent-orange transition-all duration-200 hover:scale-110"
              aria-label="Email"
            >
              <FiMail size={24} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
