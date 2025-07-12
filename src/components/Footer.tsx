import React from 'react';
import { Heart, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-green-400" />
            <span className="text-sm">Barrio La Merced, Juanjuí</span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            I.E. Héroes del Cenepa
          </h3>
          
          <p className="text-gray-400 text-sm mb-4">
            Forjando campeones dentro y fuera del campo de fútbol
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>para nuestro equipo Sub 17</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              © 2025 Mural Digital Sub 17 - I.E. Héroes del Cenepa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}