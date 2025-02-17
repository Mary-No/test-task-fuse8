import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { CharacterPage } from './pages/CaracterPage/Character';
import { Home } from './pages/Home/Home';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
  );
}

export default App;
