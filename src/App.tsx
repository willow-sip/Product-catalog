import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CatalogPage } from './pages/CatalogPage';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">
            Products
          </Link>
          <Link to="/cart">
            Cart
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;