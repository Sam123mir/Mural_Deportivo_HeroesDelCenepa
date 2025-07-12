import React, { useState } from 'react';
import API_URL from '../config';
import { Post } from '../types';
import { Save, Trash2, LogOut, Plus } from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onLogout: () => void;
}

export default function AdminPanel({ posts, onAddPost, onDeletePost, onLogout }: AdminPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [newPost, setNewPost] = useState({
    description: '',
    date: new Date().toISOString().split('T')[0],
    sport: 'futbol' as 'futbol' | 'futsal',
    gender: 'masculino' as 'masculino' | 'femenino',
    category: 'C' as 'B' | 'C',
    subcategory: undefined as 'sub14' | 'sub17' | undefined,
    contentType: 'entrenamiento' as 'partido' | 'entrenamiento' | 'evento' | 'momento-especial',
    rival: '',
    result: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile && newPost.description) {
      const formData = new FormData();
      formData.append('image', imageFile);
      Object.entries(newPost).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      try {
        const response = await fetch(`${API_URL}/api/posts`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const createdPost = await response.json();
          onAddPost(createdPost);
          setNewPost({
            description: '',
            date: new Date().toISOString().split('T')[0],
            sport: 'futbol',
            gender: 'masculino',
            category: 'C',
            subcategory: undefined,
            contentType: 'entrenamiento',
            rival: '',
            result: '',
          });
          setImageFile(null);
          setShowAddForm(false);
        } else {
          console.error('Error al crear la publicación');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  const showSubcategory = newPost.sport === 'futsal' && newPost.category === 'C';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración - Mural Deportivo</h1>
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
            <h2 className="text-xl font-semibold">Gestionar Publicaciones Deportivas</h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Deporte */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deporte *
                  </label>
                  <select
                    value={newPost.sport}
                    onChange={(e) => setNewPost({ ...newPost, sport: e.target.value as 'futbol' | 'futsal' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="futbol">⚽ Fútbol</option>
                    <option value="futsal">🥅 Futsal</option>
                  </select>
                </div>

                {/* Género */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Género *
                  </label>
                  <select
                    value={newPost.gender}
                    onChange={(e) => setNewPost({ ...newPost, gender: e.target.value as 'masculino' | 'femenino' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="masculino">👨 Masculino</option>
                    <option value="femenino">👩 Femenino</option>
                  </select>
                </div>

                {/* Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value as 'B' | 'C' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="B">📚 Categoría B (Primaria)</option>
                    <option value="C">🎓 Categoría C (Secundaria)</option>
                  </select>
                </div>

                {/* Subcategoría (solo para Futsal Categoría C) */}
                {showSubcategory && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategoría *
                    </label>
                    <select
                      value={newPost.subcategory || ''}
                      onChange={(e) => setNewPost({ ...newPost, subcategory: e.target.value as 'sub14' | 'sub17' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccionar subcategoría</option>
                      <option value="sub14">🏃 Sub 14</option>
                      <option value="sub17">🏃‍♂️ Sub 17</option>
                    </select>
                  </div>
                )}

                {/* Tipo de Contenido */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Contenido *
                  </label>
                  <select
                    value={newPost.contentType}
                    onChange={(e) => setNewPost({ ...newPost, contentType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="entrenamiento">🏃 Entrenamiento</option>
                    <option value="partido">⚽ Partido</option>
                    <option value="evento">🏆 Evento</option>
                    <option value="momento-especial">✨ Momento Especial</option>
                  </select>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    value={newPost.date}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Subir imagen */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subir imagen *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    required
                  />
                   {imageFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Archivo seleccionado: {imageFile.name}
                    </p>
                  )}
                </div>

                {/* Descripción */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    placeholder="Describe la actividad deportiva..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Rival (opcional) */}
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

                {/* Resultado (opcional) */}
                <div>
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
                  Publicar Contenido
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
                No hay publicaciones aún. ¡Agrega el primer contenido deportivo!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={`${API_URL}${post.imageUrl}`}
                      alt={post.description}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                      }}
                    />
                    <div className="space-y-1 mb-3">
                      <p className="text-sm font-medium text-gray-800">
                        {post.sport === 'futbol' ? '⚽ Fútbol' : '🥅 Futsal'} - {post.gender === 'masculino' ? '👨 Masculino' : '👩 Femenino'}
                      </p>
                      <p className="text-xs text-gray-600">
                        Categoría {post.category} {post.subcategory && `- ${post.subcategory.toUpperCase()}`}
                      </p>
                      <p className="text-xs text-gray-600">
                        {post.contentType === 'partido' && '⚽ Partido'}
                        {post.contentType === 'entrenamiento' && '🏃 Entrenamiento'}
                        {post.contentType === 'evento' && '🏆 Evento'}
                        {post.contentType === 'momento-especial' && '✨ Momento Especial'}
                      </p>
                    </div>
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