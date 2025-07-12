import React from 'react';
import { Filter } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  postCount: number;
}

export default function FilterBar({ filters, onFilterChange, postCount }: FilterBarProps) {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset subcategory if sport is not futsal or category is not C
    if (key === 'sport' && value !== 'futsal') {
      newFilters.subcategory = 'all';
    }
    if (key === 'category' && value !== 'C') {
      newFilters.subcategory = 'all';
    }
    
    onFilterChange(newFilters);
  };

  const showSubcategory = filters.sport === 'futsal' && filters.category === 'C';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Filtrar Contenido
        </h3>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
          {postCount} publicaciones
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Deporte */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deporte
          </label>
          <select
            value={filters.sport}
            onChange={(e) => handleFilterChange('sport', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="futbol">⚽ Fútbol</option>
            <option value="futsal">🥅 Futsal</option>
          </select>
        </div>

        {/* Género */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Género
          </label>
          <select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="masculino">👨 Masculino</option>
            <option value="femenino">👩 Femenino</option>
          </select>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Todas</option>
            <option value="B">📚 Categoría B (Primaria)</option>
            <option value="C">🎓 Categoría C (Secundaria)</option>
          </select>
        </div>

        {/* Subcategoría (solo para Futsal Categoría C) */}
        {showSubcategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategoría
            </label>
            <select
              value={filters.subcategory}
              onChange={(e) => handleFilterChange('subcategory', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todas</option>
              <option value="sub14">🏃 Sub 14</option>
              <option value="sub17">🏃‍♂️ Sub 17</option>
            </select>
          </div>
        )}

        {/* Tipo de Contenido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Contenido
          </label>
          <select
            value={filters.contentType}
            onChange={(e) => handleFilterChange('contentType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="partido">⚽ Partidos</option>
            <option value="entrenamiento">🏃 Entrenamientos</option>
            <option value="evento">🏆 Eventos</option>
            <option value="momento-especial">✨ Momentos Especiales</option>
          </select>
        </div>
      </div>
    </div>
  );
}