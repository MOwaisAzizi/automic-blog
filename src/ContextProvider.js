import { createContext,useContext,useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      body: faker.hacker.phrase(),
    };

  }

// 1-crate a Context
const PostContext = createContext()

function PostProvider({children}){
    const [posts, setPosts] = useState(() =>
    Array.from({ length: 20 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Derived state.These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const value = {
    posts:searchedPosts,
    onAddPost:handleAddPost,
    onClearPosts:handleClearPosts,
    searchQuery,
    setSearchQuery,
  }

  return (
  <PostContext.Provider 
  value = { value }
    >
        {children}</PostContext.Provider>
    )
}

function usePosts(){
    const context = useContext(PostContext)
    if(context==undefined) throw new Error('You can not use PostProvider outside the  context.Provider')
    return context
    }

export {PostProvider,usePosts}