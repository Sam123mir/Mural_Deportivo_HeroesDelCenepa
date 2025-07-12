import React, { useState } from 'react';
import { Calendar, Target, Trophy } from 'lucide-react';
import { Post } from '../types';

interface PhotoCardProps {
  post: Post;
}

export default function PhotoCard({ post }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
      <div className="relative bg-gray-100 aspect-square">
        {!imageError ? (
          <img
            src={post.imageUrl}
            alt={post.description}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm">Imagen no disponible</p>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-gray-800 text-sm mb-3 line-clamp-3">
          {post.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>{formatDate(post.date)}</span>
          </div>
          
          {post.rival && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Target className="h-4 w-4 text-blue-500" />
              <span>vs {post.rival}</span>
            </div>
          )}
          
          {post.result && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span>{post.result}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}