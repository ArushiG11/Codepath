import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BreweryDashboard from './components/BreweryDashboard';
import BreweryDetail from './components/BreweryDetail';
import './styles.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">🏠 Dashboard</Link>
        <span>Brewery Data Explorer</span>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<BreweryDashboard />} />
          <Route path="/brewery/:id" element={<BreweryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
