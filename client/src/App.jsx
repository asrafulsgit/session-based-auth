// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Private from './components/Private';
import Dashboard from './components/Dashboard';
import Login from './components/login';


const App = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/verify-auth', { withCredentials: true })
      .then((res) => {
        setAuthorized(res.data.credentials);
      })
      .catch(() => {
        setAuthorized(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Private authorized={authorized} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
