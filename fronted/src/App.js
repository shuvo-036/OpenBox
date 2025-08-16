import React from 'react';
import "./App.css";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/landingpage.jsx';
import Messege from './pages/messege.jsx';
import Error from './pages/error.jsx';
import Contact from './pages/contact.jsx';
import Newchat from './pages/newchat.jsx';
import Download from './pages/download.jsx';

export default function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/messege" element={<Messege />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/newpage" element={<Newchat />} />
        <Route path="/download" element={<Download />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

