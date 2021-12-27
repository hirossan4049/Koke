import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { TrackLists } from "./pages/tracklists/TrackLists"
import { Home } from "./pages/home/Home"
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <h1>hello router</h1>
      <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/tracklists/:trackId" element={<TrackLists/>} />
      <Route element={<h1>not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
