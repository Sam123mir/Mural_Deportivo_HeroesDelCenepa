import React, { useState } from 'react';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { Post, AuthState } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

const ADMIN_PASSWORD = 'I.EHeroesDelCenepa2025_Futbol';

function App() {
  const [posts, setPosts] = useLocalStorage<Post[]>('mural_posts', []);
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);

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

  // Sort posts by creation date (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (authState.isAdmin) {
    return (
      <AdminPanel
        posts={sortedPosts}
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
            Nuestros Momentos Más Importantes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Revive los mejores momentos de nuestro equipo Sub 17. Cada foto cuenta una historia 
            de esfuerzo, dedicación y pasión por el fútbol.
          </p>
        </div>
        
        <PhotoGallery posts={sortedPosts} />
      </main>

      <Footer />

      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}
    </div>
  );
}

export default App;