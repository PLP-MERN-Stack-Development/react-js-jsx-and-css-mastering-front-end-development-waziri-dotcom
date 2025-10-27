import { useEffect, useState } from 'react'

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, deps)

  return { data, loading, error }
}
