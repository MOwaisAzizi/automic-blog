import { createContext,useContext,useState } from "react";

function createRandomPost() {
    // return {
    //   title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    //   body: faker.hacker.phrase(),
    // };
    return {
      title: ` this is a post`,
      body: 'body Posting..............',
    };
  }

// 1-crate a Context
const PostContext = createContext()

function PostProvider({children}){
    const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
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


  return (
  <PostContext.Provider 
  value = {
    {
      posts:searchedPosts,
      onAddPost:handleAddPost,
      onClearPosts:handleClearPosts,
      searchQuery,
      setSearchQuery,
    }
  }
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