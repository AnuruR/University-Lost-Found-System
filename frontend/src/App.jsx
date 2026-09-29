import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Report from './pages/Report';
import Found from './pages/Found';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  return (
<Router>
  <NavBar user={user} setUser={setUser}/>
  <Routes>
    <Route path="/" element={<Home user={user} error={error}/>}/>
    <Route path="/login" element={<Login setUser={setUser}/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/report" element={<Report user={user} error={error}/>}/>
    <Route path="/found" element={<Found user={user} error={error}/>}/>
  </Routes>
</Router>
  );
}

export default App;
