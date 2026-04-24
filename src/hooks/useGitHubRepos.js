import { useState, useEffect } from 'react'
import axios from 'axios'

export function useGitHubRepos(username) {
  const [repos, setRepos]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    axios
      .get(`https://api.github.com/users/${username}/repos`, {
        params: { sort: 'updated', per_page: 12, type: 'public' },
        signal: controller.signal,
      })
      .then(({ data }) => setRepos(data))
      .catch(err => {
        if (!axios.isCancel(err)) setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [username])

  return { repos, loading, error }
}
