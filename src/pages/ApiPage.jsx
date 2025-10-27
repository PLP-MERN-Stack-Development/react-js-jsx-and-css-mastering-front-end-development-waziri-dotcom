import React, { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import useFetch from '../hooks/useFetch'

const PAGE_SIZE = 10

export default function ApiPage(){
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [display, setDisplay] = useState([]) // posts to show
  const [loadingMore, setLoadingMore] = useState(false)

  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts', [])

  useEffect(() => {
    if (data) setAllPosts(data)
  }, [data])

  const filtered = useMemo(() => {
    if (!query.trim()) return allPosts
    const q = query.toLowerCase()
    return allPosts.filter(p => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q))
  }, [allPosts, query])

  useEffect(() => {
    // reset display when filter changes
    setPage(1)
    setDisplay(filtered.slice(0, PAGE_SIZE))
  }, [filtered])

  const loadMore = () => {
    setLoadingMore(true)
    setTimeout(() => { // simulate latency
      const next = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
      setDisplay(prev => [...prev, ...next])
      setPage(prev => prev + 1)
      setLoadingMore(false)
    }, 300)
  }

  // infinite scroll via IntersectionObserver:
  const loadRef = useRef()
  useEffect(() => {
    const node = loadRef.current
    if (!node) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // only load if there are more items
        if (display.length < filtered.length && !loadingMore) {
          loadMore()
        }
      }
    }, { root: null, rootMargin: '0px', threshold: 1.0 })
    obs.observe(node)
    return () => obs.disconnect()
    // eslint-disable-next-line
  }, [display, filtered, loadingMore])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">JSONPlaceholder Posts</h1>

      <Card>
        <div className="flex gap-2 mb-4">
          <input
            placeholder="Search posts by title or body..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-gray-300 bg-transparent dark:border-gray-700"
          />
          <Button variant="secondary" onClick={() => { setQuery('') }}>Clear</Button>
        </div>

        {loading && <div className="p-4">Loading...</div>}
        {error && <div className="p-4 text-red-500">Error: {error.message}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {display.map(post => (
            <article key={post.id} className="p-3 border rounded bg-white dark:bg-gray-800">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">{post.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center">
          {display.length < filtered.length ? (
            <div ref={loadRef} className="py-4">
              <Button onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? 'Loading...' : 'Load more'}
              </Button>
            </div>
          ) : (
            <div className="text-sm text-gray-500 py-4">No more posts</div>
          )}
        </div>
      </Card>
    </div>
  )
}
