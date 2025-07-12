export interface Post {
  id: string;
  imageUrl: string;
  description: string;
  date: string;
  rival?: string;
  result?: string;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
}