import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    if (!user) return;
    axiosClient.get("/auth/me")
      .then(res => {
        setBio(res.data.bio || "");
        setSkills((res.data.skills || []).join(", "));
      })
      .catch(console.error);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await axiosClient.put("/auth/profile", {
        bio,
        skills: skills.split(",").map(s => s.trim()),
      });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container">
      <h1>Profile: {user.username}</h1>
      <form onSubmit={handleSubmit} className="thread-form">
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          className="textarea"
        />
        <label>Skills (comma-separated)</label>
        <input
          value={skills}
          onChange={e => setSkills(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Save</button>
      </form>
    </div>
  );
}
