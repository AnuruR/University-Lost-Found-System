import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Found from "./pages/Found";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="relative flex min-h-screen flex-col">
        <NavBar user={user} setUser={setUser} />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<Report />} />
            <Route path="/found" element={<Found />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
