import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../../data/skills'
import SectionTitle from '../ui/SectionTitle'
import SkillBadge   from '../ui/SkillBadge'

const HEADER_COLOR = {
  cyan:   'text-accent-cyan',
  purple: 'text-accent-purple',
  orange: 'text-accent-orange',
  pink:   'text-accent-pink',
}

export default function Skills() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionTitle
          eyebrow="What I work with"
          title="Skills & Technologies"
          subtitle="A diverse toolkit built across two universities and multiple years of hands-on projects."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-16">
          {SKILLS.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className={`font-semibold text-sm uppercase tracking-wide font-mono ${HEADER_COLOR[category.color]}`}>
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, j) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    color={category.color}
                    delay={i * 0.1 + j * 0.04}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
