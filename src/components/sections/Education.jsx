import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMapPin, FiCalendar, FiBook } from 'react-icons/fi'
import { EDUCATION } from '../../data/education'
import { useLang }   from '../../i18n'
import SectionTitle  from '../ui/SectionTitle'

export default function Education() {
  const { t }    = useLang()
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="section-padding bg-bg-primary">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <SectionTitle eyebrow={t.education.eyebrow} title={t.education.title} subtitle={t.education.subtitle} />

        <div className="mt-16 relative">
          <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-purple/60 to-transparent" />

          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative pl-10 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-1.5 z-10">
                <div className="w-4 h-4 rounded-full border-2 border-accent-cyan bg-bg-primary relative">
                  {edu.status === 'ongoing' && (
                    <span className="absolute inset-0 rounded-full bg-accent-cyan/50 animate-ping" />
                  )}
                </div>
              </div>

              <div className="glass-card p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-text-primary font-bold text-lg leading-tight">{edu.institution}</h3>
                  {edu.status === 'ongoing' && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs font-mono border border-accent-cyan/30">
                      {t.education.ongoing}
                    </span>
                  )}
                </div>

                <p className="text-accent-cyan font-medium text-sm mb-3">{edu.degree}</p>

                <div className="flex flex-wrap gap-4 text-text-dim text-xs mb-4">
                  <span className="flex items-center gap-1.5"><FiCalendar size={12} />{edu.period}</span>
                  <span className="flex items-center gap-1.5"><FiMapPin size={12} />{edu.location}</span>
                </div>

                {edu.courses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-text-dim text-xs mb-2">
                      <FiBook size={12} />
                      <span>{t.education.courses}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map(course => (
                        <span key={course} className="px-2 py-0.5 rounded bg-bg-tertiary text-text-dim text-xs border border-white/5">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
