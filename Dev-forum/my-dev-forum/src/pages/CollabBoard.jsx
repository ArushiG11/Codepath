import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function CollaborationBoardPage() {
  const [posts, setPosts] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/collaborations")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    try {
      const res = await axiosClient.post("/collaborations", {
        projectTitle,
        description,
        contactInfo,
      });
      setPosts([res.data, ...posts]);
      setProjectTitle("");
      setDescription("");
      setContactInfo("");
    } catch (err) {
      console.error(err);
      alert("Failed to post collaboration");
    }
  };

  return (
    <div className="container">
      <h1>Collaboration Board</h1>

      {user ? (
        <form onSubmit={handleSubmit} className="thread-form">
          <label>Project Title</label>
          <input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Project Title"
            className="input"
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            className="textarea"
            required
          />

          <label>Contact Info</label>
          <input
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Your Contact (email, link)"
            className="input"
            required
          />

          <button type="submit" className="btn">
            Post
          </button>
        </form>
      ) : (
        <p>
          Please <Link to="/login">log in</Link> to post a collaboration.
        </p>
      )}

      {posts.length === 0 ? (
        <p className="empty">No collaboration posts yet.</p>
      ) : (
        <ul className="thread-list">
          {posts.map((post) => (
            <li key={post._id} className="thread-card">
              <h2 className="thread-title">{post.projectTitle}</h2>
              <p className="thread-excerpt">
                {post.description.length > 100
                  ? post.description.slice(0, 100) + "…"
                  : post.description}
              </p>
              <p className="thread-meta">by {post.author.username}</p>
              <p className="thread-meta">Contact: {post.contactInfo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
