import React from 'react';
import API_URL from '../config';
import { Post } from '../types';
import { X, Calendar, Target, Trophy, Users, BookOpen, GraduationCap } from 'lucide-react';

interface PhotoModalProps {
  post: Post;
  onClose: () => void;
}

export default function PhotoModal({ post, onClose }: PhotoModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getSportIcon = () => (post.sport === 'futbol' ? '⚽' : '🥅');
  const getGenderIcon = () => (post.gender === 'masculino' ? '👨' : '👩');
  const getCategoryIcon = () => (post.category === 'B' ? <BookOpen className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />);
  const getContentTypeIcon = () => {
    switch (post.contentType) {
      case 'partido': return '⚽';
      case 'entrenamiento': return '🏃';
      case 'evento': return '🏆';
      case 'momento-especial': return '✨';
      default: return '📸';
    }
  };
  const getContentTypeLabel = () => {
    switch (post.contentType) {
        case 'partido': return 'Partido';
        case 'entrenamiento': return 'Entrenamiento';
        case 'evento': return 'Evento';
        case 'momento-especial': return 'Momento Especial';
        default: return 'Publicación';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-3/5 h-64 md:h-auto bg-gray-100">
          <img 
            src={`${API_URL}${post.imageUrl}`}
            alt={post.description} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="w-full md:w-2/5 p-6 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <span>{getContentTypeIcon()}</span>
              <span>{getContentTypeLabel()}</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <p className="text-gray-800 text-base mb-4 whitespace-pre-wrap">
            {post.description}
          </p>

          <div className="mt-auto space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-5 w-5 text-green-500" />
              <span>{formatDate(post.date)}</span>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span>{getSportIcon()}</span>
                <span className="capitalize">{post.sport}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{getGenderIcon()}</span>
                <span className="capitalize">{post.gender}</span>
              </div>
              <div className="flex items-center gap-1">
                {getCategoryIcon()}
                <span>Cat. {post.category}</span>
              </div>
            </div>

            {post.sport === 'futsal' && post.category === 'C' && post.subcategory && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="uppercase">{post.subcategory}</span>
              </div>
            )}
            
            {post.rival && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="h-5 w-5 text-blue-500" />
                <span>vs {post.rival}</span>
              </div>
            )}
            
            {post.result && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>{post.result}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}