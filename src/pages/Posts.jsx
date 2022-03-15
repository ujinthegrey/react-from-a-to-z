import React, {useEffect, useRef, useState} from 'react';
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sotr: '', queryTitle: '', queryBody: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setTLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.queryTitle, filter.queryBody)  
  const lastElement = useRef()
  console.log(lastElement)
  
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })  

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton onClick={() => setModal(true)} style={{marginTop: '30px'}}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
       <PostForm create={createPost} />
      </MyModal>      
      <hr style={{margin: '15px 0px'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect
        value={limit}
        onChange={value => setTLimit(value)}
        defaultValue='number of posts on the page'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 15, name: '15'},
          {value: 20, name: '20'},
          {value: 25, name: '25'},
          {value: -1, name: 'all'}
        ]}
      />
      {postError &&
        <h1>Error ${postError} happened!</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="A Wonderful Post List" />
      <div ref={lastElement} style={{height: '5px'}}/>
      {isPostsLoading &&
        <Loader />         
      }      
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />              
    </div>
  )
}

export default Posts