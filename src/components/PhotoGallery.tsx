import React from 'react';
import { Post } from '../types';
import PhotoCard from './PhotoCard';

interface PhotoGalleryProps {
  posts: Post[];
  onPhotoClick: (post: Post) => void;
}

export default function PhotoGallery({ posts, onPhotoClick }: PhotoGalleryProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          ¡Próximamente nuestras primeras fotos!
        </h3>
        <p className="text-gray-500">
          Los equipos deportivos del colegio estarán subiendo contenido muy pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => (
        <PhotoCard key={post.id} post={post} onClick={() => onPhotoClick(post)} />
      ))}
    </div>
  );
}