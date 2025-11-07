import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-500 text-white z-50 border-b">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">DragonBall CRUD</h1>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Ver personajes
          </Link>
          <Link to="/create" className="hover:text-yellow-400 transition-colors">
            Crear personaje
          </Link>
          <Link to="/custom" className="hover:text-yellow-400 transition-colors">
            Ver personajes creados
          </Link>
          <Link to="/dashboard" className="hover:text-yellow-400 transition-colors">
            Dashboard
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-600 flex flex-col gap-3 px-6 pb-4 pt-4">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Ver personajes
          </Link>
          <Link
            to="/create"
            className="hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Crear personaje
          </Link>
          <Link
            to="/custom"
            className="hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Ver personajes creados
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
