import React, { useEffect, useState, useCallback } from 'react';
import Post from '../components/Post';
import './styles/feed.scss'

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [VID, setVID] = useState(null);

  useEffect(() => {
    loadPosts(page);
  }, [page]);

  const loadPosts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost/api/posts/feed?page=${page}&limit=3&home=true`, { credentials: 'include' });
      let res = await response.json();
      let newPosts = res.posts;

      setVID(res.user);


      setPosts(prevPosts => [...prevPosts, ...newPosts]); // Desempaquetar los nuevos posts


      setHasMore(res.posts.length > 0);

    } catch (error) {
      console.error('Error al cargar el feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

    if (scrolledToBottom) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div  className='feedContainer'>
      {posts.map((post, idx) => (
        <Post key={idx} id={post.post._id} ownerID={post.post.ownerID} viewerID={VID}
          username={post.u.username} profilePIC={post.u.pic} isVerified={post.u.isVerified}
          postText={post.post.textContent} postImage={post.post.image}
          likes={post.post.likes} comments={post.post.commnets} />
      ))}
      {loading && <p>Cargando más posts...</p>}
      {!hasMore && <p>No hay más posts para mostrar</p>}
    </div>
  );
};

export default Feed;
