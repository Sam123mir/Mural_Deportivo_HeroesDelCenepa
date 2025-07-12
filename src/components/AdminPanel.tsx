import React, { useState } from 'react';
import { Post } from '../types';
import { Upload, X, Save, Trash2, LogOut, Plus } from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  onDeletePost: (id: string) => void;
  onLogout: () => void;
}

export default function AdminPanel({ posts, onAddPost, onDeletePost, onLogout }: AdminPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({
    imageUrl: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    rival: '',
    result: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.imageUrl && newPost.description) {
      onAddPost(newPost);
      setNewPost({
        imageUrl: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        rival: '',
        result: ''
      });
      setShowAddForm(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, imageUrl: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestionar Publicaciones</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Nueva Publicación
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de la imagen *
                  </label>
                  <input
                    type="url"
                    value={newPost.imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Puedes usar URLs de imágenes de servicios como Imgur, Google Photos, etc.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    placeholder="Describe la foto (entrenamiento, partido, celebración, etc.)"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={newPost.date}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rival (opcional)
                  </label>
                  <input
                    type="text"
                    value={newPost.rival}
                    onChange={(e) => setNewPost({ ...newPost, rival: e.target.value })}
                    placeholder="Nombre del equipo rival"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resultado (opcional)
                  </label>
                  <input
                    type="text"
                    value={newPost.result}
                    onChange={(e) => setNewPost({ ...newPost, result: e.target.value })}
                    placeholder="Ej: Victoria 2-1, Empate 1-1, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Guardar Publicación
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              Publicaciones Existentes ({posts.length})
            </h3>
            
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No hay publicaciones aún. ¡Agrega la primera foto del equipo!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={post.imageUrl}
                      alt={post.description}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                      }}
                    />
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {post.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </p>
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}