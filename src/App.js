// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewOrderPage from './pages/NewOrderPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-order" element={<NewOrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
