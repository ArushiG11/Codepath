import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DevLogsPage() {
  const [logs, setLogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get("/devlogs")
      .then(res => setLogs(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    try {
      const res = await axiosClient.post("/devlogs", { title, content });
      setLogs([res.data, ...logs]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to post dev log");
    }
  };

  return (
    <div className="container">
      <h1>Dev Logs</h1>
      {user ? (
        <form onSubmit={handleSubmit} className="thread-form">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Log Title"
            className="input"
            required
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What did you work on today?"
            className="textarea"
            required
          />
          <button type="submit" className="btn">Post Log</button>
        </form>
      ) : (
        <p>Please <a href="/login">log in</a> to post a dev log.</p>
      )}
      <ul className="thread-list">
        {logs.map(log => (
          <li key={log._id} className="thread-card">
            <strong>{log.title}</strong>
            <p>{log.content.slice(0, 100)}…</p>
            <small>by {log.author.username}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
