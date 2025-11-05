import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav  className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">DragonBall CRUD</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-400">Ver personajes</Link>
        <Link to="/create" className="hover:text-yellow-400">Crear personaje</Link>
        <Link to="/custom" className="hover:text-yellow-400">Ver personajes creados</Link>
      </div>
    </div>

    </nav>
    
  )
}

export default Navbar
