import React from 'react';
import { Trophy, Users, Calendar } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">
                Mural Digital Sub 17
              </h1>
              <p className="text-green-100 text-sm md:text-base">
                I.E. Héroes del Cenepa - Barrio La Merced, Juanjuí
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-center md:text-right">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Sub 17</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Temporada 2025</span>
            </div>
            <button
              onClick={onAdminClick}
              className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}