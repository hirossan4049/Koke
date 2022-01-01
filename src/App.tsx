import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { TrackLists } from "./pages/tracklists/TrackLists"
import { Home } from "./pages/home/Home"
import logo from './logo.svg';
import './App.css';
import { Box, Flex } from '@chakra-ui/react';
import { Editor } from './pages/editor/Editor';

function App() {
  return (
    <Box bg="gray.100" width="100" >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <Flex bg="white" height={{base: "0", md: "10"}}>
        </Flex> */}
        <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/tracklists/:trackId" element={<TrackLists/>} />
        <Route path="/editor/:trackId" element={<Editor />} />
        <Route element={<h1>not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}


export default App;
