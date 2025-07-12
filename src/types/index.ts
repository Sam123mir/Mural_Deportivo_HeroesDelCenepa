export interface Post {
  id: string;
  imageUrl: string;
  description: string;
  date: string;
  sport: 'futbol' | 'futsal';
  gender: 'masculino' | 'femenino';
  category: 'B' | 'C';
  subcategory?: 'sub14' | 'sub17'; // Only for futsal category C
  contentType: 'partido' | 'entrenamiento' | 'evento' | 'momento-especial';
  rival?: string;
  result?: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface FilterState {
  sport: 'futbol' | 'futsal' | 'all';
  gender: 'masculino' | 'femenino' | 'all';
  category: 'B' | 'C' | 'all';
  subcategory: 'sub14' | 'sub17' | 'all';
  contentType: 'partido' | 'entrenamiento' | 'evento' | 'momento-especial' | 'all';
}