import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'
import { PERSONAL, LANGUAGES } from '../../constants'
import SectionTitle from '../ui/SectionTitle'

const STATS = [
  { label: 'Universities',    value: '2',   note: 'Peru & France'         },
  { label: 'Projects Built',  value: '7+',  note: 'Academic & Personal'   },
  { label: 'Languages',       value: '3',   note: 'ES / FR / EN'          },
  { label: 'CS Experience',   value: '4+',  note: 'Years Combined'        },
]

export default function About() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionTitle
          eyebrow="Get to know me"
          title="About Me"
          subtitle="A passionate developer from Peru, currently studying and building in France."
        />

        <div className="grid md:grid-cols-2 gap-16 items-center mt-16">
          {/* Left — photo + languages */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-7"
          >
            {/* Avatar placeholder */}
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-accent-cyan/20 via-accent-purple/20 to-accent-orange/20 border border-white/10 flex items-center justify-center text-7xl select-none">
                👨‍💻
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl border-2 border-accent-cyan/30 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-accent-purple/20 pointer-events-none" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <FiMapPin className="text-accent-cyan" size={14} />
              <span>{PERSONAL.location}</span>
              <span className="text-text-dim">•</span>
              <span>from {PERSONAL.origin}</span>
            </div>

            {/* Languages */}
            <div className="w-full">
              <p className="text-center text-text-dim text-xs uppercase tracking-widest mb-4 font-mono">
                Spoken Languages
              </p>
              <div className="flex flex-col gap-3">
                {LANGUAGES.map((lang, i) => (
                  <motion.div
                    key={lang.language}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass-card px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-text-primary font-medium">{lang.language}</span>
                    </div>
                    <span className="text-sm font-mono text-accent-cyan">{lang.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — bio + stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-7"
          >
            <p className="text-text-muted text-lg leading-relaxed">{PERSONAL.bio}</p>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-text-primary font-medium text-sm">{stat.label}</p>
                  <p className="text-text-dim text-xs">{stat.note}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass-card p-5 border-l-4 border-accent-cyan"
            >
              <p className="text-text-muted italic text-sm leading-relaxed">
                "I've always loved exploring everything and I'm afraid of nothing. My education has given me not only academic knowledge, but also human values and humility."
              </p>
            </motion.div>

            <div className="flex gap-4">
              <a href="#contact" className="btn-primary flex-1 text-center text-sm">
                Contact Me
              </a>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 text-center text-sm"
              >
                GitHub Profile
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
