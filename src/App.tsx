import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import FilterBar from './components/FilterBar';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import PhotoModal from './components/PhotoModal';
import { Post, AuthState, FilterState } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const ADMIN_PASSWORD = 'I.EHeroesDelCenepa2025_Futbol';

function App() {
  const [posts, setPosts] = useLocalStorage<Post[]>('sports_mural_posts', []);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sport: 'all',
    gender: 'all',
    category: 'all',
    subcategory: 'all',
    contentType: 'all'
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleAdminLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAuthState({ isAuthenticated: true, isAdmin: true });
      setShowAdminLogin(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, isAdmin: false });
  };

  const handleAddPost = (newPostData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...newPostData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (id: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (filters.sport !== 'all' && post.sport !== filters.sport) return false;
      if (filters.gender !== 'all' && post.gender !== filters.gender) return false;
      if (filters.category !== 'all' && post.category !== filters.category) return false;
      if (filters.subcategory !== 'all' && post.subcategory !== filters.subcategory) return false;
      if (filters.contentType !== 'all' && post.contentType !== filters.contentType) return false;
      return true;
    });
  }, [posts, filters]);

  // Sort posts by creation date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (authState.isAdmin) {
    return (
      <AdminPanel
        posts={posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
        onAddPost={handleAddPost}
        onDeletePost={handleDeletePost}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAdminClick={() => setShowAdminLogin(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nuestros Momentos Deportivos Más Importantes
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Revive los mejores momentos de todos nuestros equipos deportivos. Cada foto cuenta una historia 
            de esfuerzo, dedicación y pasión por el deporte. No importa la edad, género o disciplina: 
            todos somos parte del mismo equipo Héroes del Cenepa.
          </p>
        </div>

        <FilterBar 
          filters={filters} 
          onFilterChange={setFilters} 
          postCount={sortedPosts.length}
        />
        
        <PhotoGallery posts={sortedPosts} onPhotoClick={setSelectedPost} />
      </main>

      <Footer />

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {selectedPost && (
        <PhotoModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default App;