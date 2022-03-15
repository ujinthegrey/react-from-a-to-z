import { useMemo } from "react"

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => { 
        if (sort) {
          return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
      }, [sort, posts])

      return sortedPosts
}

export const usePosts = (posts, sort, queryTitle, queryBody) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        if (queryTitle) {
          return sortedPosts.filter(post => post.title.toLowerCase().includes(queryTitle.toLowerCase()))
        } 
          return sortedPosts.filter(post => post.body.toLowerCase().includes(queryBody.toLowerCase()))
      }, [queryTitle, queryBody, sortedPosts])

      return sortedAndSearchedPosts
}