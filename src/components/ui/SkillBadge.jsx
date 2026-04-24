import { motion } from 'framer-motion'

const COLOR_MAP = {
  cyan:   'border-accent-cyan/25   text-accent-cyan/80   hover:bg-accent-cyan/10   hover:border-accent-cyan/50',
  purple: 'border-accent-purple/25 text-accent-purple/80 hover:bg-accent-purple/10 hover:border-accent-purple/50',
  orange: 'border-accent-orange/25 text-accent-orange/80 hover:bg-accent-orange/10 hover:border-accent-orange/50',
  pink:   'border-accent-pink/25   text-accent-pink/80   hover:bg-accent-pink/10   hover:border-accent-pink/50',
}

export default function SkillBadge({ skill, color = 'cyan', delay = 0, isInView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.3 }}
      className={`px-3 py-1.5 rounded-full border text-sm font-mono cursor-default transition-all duration-200 ${COLOR_MAP[color]}`}
    >
      {skill}
    </motion.span>
  )
}
