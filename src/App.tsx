import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
          <Route path="/" element={<div>Products catalog</div>} />
          <Route path="/cart" element={<div>Cart</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;