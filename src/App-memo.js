import { memo, useCallback, useEffect, useMemo, useState } from "react";


function createRandomPost() {
    return {
        title: ` this is a post`,
        body: 'body Posting..............',
      };

}

function App() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isFakeDark, setIsFakeDark] = useState(false);

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      : posts;

      //it gois to archive and and make the arcive again and re-render it
  const handleAddPost =useCallback(function handleAddPost (post) {
      setPosts((posts) => [post, ...posts]);
    })

  function handleClearPosts() {
    setPosts([]);
  }

  // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
  useEffect(
    function () {
      document.documentElement.classList.toggle("fake-dark-mode");
    },
    [isFakeDark]
  );

  const archivePost  = useMemo(()=>{
    //it will save in catch and not recreated whin dependences not changed    
   return { show:false,
    title:`archive Post ${posts.length}`
  }
},[posts.length])

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <Header
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Main posts={searchedPosts} onAddPost={handleAddPost} />



      <Archive archivePost={archivePost} onAddPost={handleAddPost}/>
      <Footer />
    </section>
  );
}
function Header({ posts, onClearPosts, searchQuery, setSearchQuery }) {
  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results posts={posts} />
        <SearchPosts
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts({ searchQuery, setSearchQuery }) {
  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results({ posts }) {
  return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main({ posts, onAddPost }) {
  return (
    <main>
      <FormAddPost onAddPost={onAddPost} />
      <Posts posts={posts} />
    </main>
  );
}

function Posts({ posts }) {
  return (
    <section>
      <List posts={posts} />
    </section>
  );
}

function FormAddPost({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"/>
      <button>Add post</button>
    </form>
  );
}
function List({ posts }) {
  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

const Archive = memo(function Archive({ archivePost,onAddPost }) {
  // Here we don't need the setter function. We're only using state to store these posts 
  // because the callback function passed into useState (which generates the posts) is only called once, on the initial render.
  //  So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render.
  //  We could also move the posts outside the components, but I wanted to show you this trick 😉
  const [posts] = useState(() =>
    Array.from({ length: 5000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(archivePost.show);

  return (
    <aside>
      <h2>{archivePost.title}</h2>
      <button onClick={() => setShowArchive((s) => !s)}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <p>
                <strong>{post.title}:</strong> {post.body}
              </p>
              <button onClick={() => onAddPost(post)}>Add as new post</button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
)

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
