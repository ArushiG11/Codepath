// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import ThreadDetail from "./pages/ThreadDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import DevLogs from "./pages/DevLogs";
import CollabBoard from "./pages/CollabBoard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">My Dev Forum</Link>{" "}
      </div>
      <div className="navbar-links">
        <Link to="/forum">Forum</Link> |{" "}
        <Link to="/devlogs">Dev Logs</Link> |{" "}
        <Link to="/collab">Collab Board</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:threadId" element={<ThreadDetail />} />
        <Route path="/devlogs" element={<DevLogs />} />
        <Route path="/collab" element={<CollabBoard />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
