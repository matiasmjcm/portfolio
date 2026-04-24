import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import { PERSONAL } from '../../constants'
import SectionTitle  from '../ui/SectionTitle'

const CONTACT_LINKS = [
  {
    Icon:  FiMail,
    label: 'Email',
    value: 'matias_mjcm@hotmail.com',
    href:  `mailto:${PERSONAL.email}`,
    color: 'orange',
  },
  {
    Icon:  FiGithub,
    label: 'GitHub',
    value: 'matiasmjcm',
    href:  PERSONAL.github,
    color: 'cyan',
  },
  {
    Icon:  FiLinkedin,
    label: 'LinkedIn',
    value: 'matias-jose-castro',
    href:  PERSONAL.linkedin,
    color: 'purple',
  },
]

const CARD_STYLES = {
  cyan:   'border-accent-cyan/30   hover:border-accent-cyan/60   hover:bg-accent-cyan/5',
  purple: 'border-accent-purple/30 hover:border-accent-purple/60 hover:bg-accent-purple/5',
  orange: 'border-accent-orange/30 hover:border-accent-orange/60 hover:bg-accent-orange/5',
}
const ICON_STYLES = {
  cyan:   'text-accent-cyan',
  purple: 'text-accent-purple',
  orange: 'text-accent-orange',
}

export default function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="section-padding bg-bg-secondary">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <SectionTitle
          eyebrow="Let's talk"
          title="Get In Touch"
          subtitle="Whether it's a job opportunity, a collaboration, or just a hello — my inbox is open."
        />

        <div className="mt-16 flex flex-col items-center gap-8">
          {/* Main text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center max-w-lg"
          >
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              I'm currently open to internship and junior developer opportunities.
              Feel free to reach out in{' '}
              <span className="text-accent-orange font-medium">Spanish</span>,{' '}
              <span className="text-accent-purple font-medium">French</span>, or{' '}
              <span className="text-accent-cyan font-medium">English</span>.
            </p>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <FiSend size={18} />
              Send Me an Email
            </a>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-text-dim text-xs font-mono">or find me on</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {CONTACT_LINKS.map(({ Icon, label, value, href, color }, i) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`group glass-card p-5 flex flex-col items-center gap-3 border transition-all duration-300 ${CARD_STYLES[color]}`}
              >
                <Icon size={24} className={ICON_STYLES[color]} />
                <div className="text-center">
                  <p className="text-text-primary font-medium text-sm">{label}</p>
                  <p className="text-text-dim text-xs mt-0.5 break-all">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
