// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Private from './components/Private';
import Dashboard from './components/Dashboard';
import Login from './components/login';


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<Login />} />
        <Route  element={<Private />}>
            <Route path="/" element={<Dashboard />} />  
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
