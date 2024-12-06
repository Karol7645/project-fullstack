import { create } from 'zustand';
import { AuthState, User } from '../types';

// Simulated user database
const USERS: Record<string, { password: string; user: User }> = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    },
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    const userRecord = USERS[email];
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid credentials');
    }
    set({ user: userRecord.user });
  },
  register: async (email: string, password: string, name: string) => {
    if (USERS[email]) {
      throw new Error('User already exists');
    }
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'user',
    };
    USERS[email] = { password, user: newUser };
    set({ user: newUser });
  },
  logout: () => set({ user: null }),
}));