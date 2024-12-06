import { ShoppingCart, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';

export function Header() {
  const cart = useStore((state) => state.cart);
  const { user, logout } = useAuthStore();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          VirtualStore
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-gray-900">
            Productos
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin/products"
              className="text-gray-600 hover:text-gray-900"
            >
              Admin Productos
            </Link>
          )}
          <Link
            to="/cart"
            className="text-gray-600 hover:text-gray-900 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}