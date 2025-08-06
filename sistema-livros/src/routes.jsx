import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Livros from './pages/Livros';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/livros" element={<Livros />} />
      </Routes>
    </Router>
  );
}