import React, { useCallback, useState, useEffect } from 'react';
import LeftSideMenu from '../components/LeftSideMenu';
import '../styles/explore.scss';
import Post from '../components/Post';
import { useLocation } from 'react-router-dom';

const Explore = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [VID, setVID] = useState(null);
    const [method, setMethod] = useState('popular');
    const [keyword, setKeyword] = useState('');

    // Hook para obtener la ubicación (URL actual)
    const location = useLocation();

    window.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' ) {
            console.log('HOLA')
            setPage(1)
            loadPosts(1, keyword, method)
        }
    })
    // Detectar si hay un keyword en la URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlKeyword = params.get('keyword');
        const urlMethod = params.get('method') || 'popular'; // por defecto 'popular' si no está en la URL

        if (urlKeyword) {
            setKeyword(urlKeyword);
            setMethod(urlMethod);
            setPage(1); // Reiniciar la página a 1
            loadPosts(1, urlKeyword, urlMethod); // Cargar posts con el keyword y método desde la URL
        }
    }, [location]);

    const loadPosts = async (page, keyword = '', method = 'popular') => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost/api/posts/feed?page=${page}&limit=3&home=true&keyword=${keyword}&method=${method}`, { credentials: 'include' });
            let res = await response.json();
            let newPosts = res.posts;

            setVID(res.user);

            if (page === 1) {
                setPosts(newPosts); // Si es la primera página, reemplazar los posts existentes
            } else {
                setPosts(prevPosts => [...prevPosts, ...newPosts]); // Si es otra página, añadir los nuevos posts
            }

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
            loadPosts(page + 1, keyword, method); // Cargar más posts al hacer scroll
        }
    }, [loading, hasMore, keyword, method, page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className='exploreContainer'>
            <LeftSideMenu />
            <div className="exploreContent">
                <h1>Explore</h1>
                <div className="filters">
                    <input
                        type="text"
                        id='keyword'
                        placeholder='Keyword'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <select id="filter" value={method} onChange={(e) => setMethod(e.target.value)}>
                        <option value="popular">Popular</option>
                        <option value="recent">Most Recent</option>
                    </select>
                </div>

                <div className="results">
                    {posts.map((post, idx) => (
                        <Post key={idx} id={post.post._id} ownerID={post.post.ownerID} viewerID={VID}
                            username={post.u.username} profilePIC={post.u.pic} isVerified={post.u.isVerified}
                            postText={post.post.textContent} postImage={post.post.image}
                            likes={post.post.likes} comments={post.post.commnets} />
                    ))}
                    {loading && <p>Cargando más posts...</p>}
                    {!hasMore && <p>No hay más posts para mostrar</p>}
                </div>
            </div>
        </div>
    );
};

export default Explore;
