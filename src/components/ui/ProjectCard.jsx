import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const CATEGORY_COLORS = {
  Web:        'text-accent-cyan',
  Systems:    'text-accent-orange',
  Algorithms: 'text-accent-purple',
  Tools:      'text-accent-pink',
  Data:       'text-accent-cyan',
}

export default function ProjectCard({ project, delay = 0, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card p-6 flex flex-col gap-4 hover:border-white/20 transition-all duration-300 group h-full"
    >
      <div>
        <span className={`text-xs font-mono uppercase tracking-wide ${CATEGORY_COLORS[project.category] ?? 'text-accent-cyan'}`}>
          {project.category}
        </span>
        <h3 className="text-text-primary font-bold text-xl mt-1 group-hover:text-accent-cyan transition-colors">
          {project.title}
        </h3>
      </div>

      <p className="text-text-muted text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map(t => (
          <span
            key={t}
            className="px-2 py-1 rounded-md bg-bg-tertiary border border-white/5 text-text-dim text-xs font-mono"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-1 rounded-md bg-bg-tertiary border border-white/5 text-text-dim text-xs font-mono">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-text-muted text-sm hover:text-accent-cyan transition-colors group/link mt-auto"
      >
        <FiGithub size={14} />
        <span>View on GitHub</span>
        <FiExternalLink size={12} className="ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
      </a>
    </motion.div>
  )
}
