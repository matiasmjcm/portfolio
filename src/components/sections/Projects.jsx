import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiStar, FiGitBranch, FiCode } from 'react-icons/fi'
import { FEATURED_PROJECTS } from '../../data/projects'
import { useGitHubRepos }    from '../../hooks/useGitHubRepos'
import { useLang }           from '../../i18n'
import SectionTitle          from '../ui/SectionTitle'
import ProjectCard           from '../ui/ProjectCard'
import { PERSONAL }          from '../../constants'

const LANG_COLORS = {
  'C++': '#f34b7d', 'Python': '#3572A5', 'JavaScript': '#f1e05a',
  'HTML': '#e34c26', 'OCaml': '#3be133', 'R': '#198CE7',
  'TypeScript': '#2b7489', 'Vue': '#41b883',
}

function GitHubRepoCard({ repo, noDesc }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card p-4 flex flex-col gap-3 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FiCode className="text-accent-cyan shrink-0" size={16} />
          <h4 className="text-text-primary font-medium text-sm group-hover:text-accent-cyan transition-colors truncate">
            {repo.name}
          </h4>
        </div>
        <FiGithub className="text-text-dim shrink-0" size={14} />
      </div>

      <p className="text-text-dim text-xs leading-relaxed line-clamp-2 flex-1">
        {repo.description ?? noDesc}
      </p>

      <div className="flex items-center gap-4 mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? '#888' }} />
            <span className="text-text-dim text-xs">{repo.language}</span>
          </div>
        )}
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1 text-text-dim text-xs">
            <FiStar size={11} /><span>{repo.stargazers_count}</span>
          </div>
        )}
        {repo.forks_count > 0 && (
          <div className="flex items-center gap-1 text-text-dim text-xs">
            <FiGitBranch size={11} /><span>{repo.forks_count}</span>
          </div>
        )}
      </div>
    </motion.a>
  )
}

export default function Projects() {
  const { t }    = useLang()
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { repos, loading, error } = useGitHubRepos('matiasmjcm')
  const featured = FEATURED_PROJECTS.find(p => p.featured)
  const rest     = FEATURED_PROJECTS.filter(p => !p.featured)

  return (
    <section id="projects" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionTitle eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 mb-8"
        >
          <div className="relative glass-card p-5 sm:p-8 border-accent-cyan/30 overflow-hidden hover:border-accent-cyan/50 transition-all duration-300">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan text-xs font-mono">
              {t.projects.featured}
            </div>
            <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-accent-cyan/5 blur-2xl pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <span className="text-accent-orange text-xs font-mono uppercase tracking-widest">{featured.category}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mt-2 mb-3 sm:mb-4 pr-16">{featured.title}</h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">{featured.description}</p>
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <FiGithub size={16} />
                  {t.projects.view_github}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.tech.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-full bg-bg-tertiary border border-white/10 text-text-muted text-sm font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-16">
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.08} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
                <FiGithub className="text-accent-cyan" />
                {t.projects.live_title}
              </h3>
              <p className="text-text-dim text-xs sm:text-sm mt-1">{t.projects.live_subtitle}</p>
            </div>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer"
               className="text-accent-cyan text-sm hover:underline flex items-center gap-1 shrink-0">
              {t.projects.view_all}
            </a>
          </div>

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <div key={i} className="glass-card h-28 animate-pulse" />)}
            </div>
          )}

          {error && (
            <div className="glass-card p-4 border-accent-orange/30 text-text-muted text-sm">
              {t.projects.error}{' '}
              <a href={PERSONAL.github} className="text-accent-cyan hover:underline">GitHub</a>.
            </div>
          )}

          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map(repo => <GitHubRepoCard key={repo.id} repo={repo} noDesc={t.projects.no_desc} />)}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
