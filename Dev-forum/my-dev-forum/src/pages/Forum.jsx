import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function ForumPage() {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all threads on mount
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axiosClient.get("/threads");
        setThreads(res.data);
      } catch (err) {
        console.error("Failed to fetch threads", err);
      }
    };
    fetchThreads();
  }, []);

  // Handle new thread submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Redirect guests to login
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await axiosClient.post("/threads", { title, content });
      // Prepend the new thread to the list
      setThreads([res.data, ...threads]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to create thread", err);
      alert("Error creating thread");
    }
  };

  return (
    <div className="container">
      <h1>Forum</h1>

      {user ? (
        <form onSubmit={handleSubmit} className="thread-form">
          <input
            type="text"
            placeholder="Thread Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Thread Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
          />
          <button type="submit" className="btn">
            Post
          </button>
        </form>
      ) : (
        <p>
          Please <Link to="/login">log in</Link> to post a new thread.
        </p>
      )}

      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread._id} className="thread-card">
            <Link to={`/forum/${thread._id}`} className="thread-title">
              {thread.title}
            </Link>
            <p className="thread-excerpt">
              {thread.content.length > 100
                ? thread.content.slice(0, 100) + "…"
                : thread.content}
            </p>
            <p className="thread-meta">by {thread.author.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
