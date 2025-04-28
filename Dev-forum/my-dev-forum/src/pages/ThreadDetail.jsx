import { useParams } from "react-router-dom";
import { useState } from "react";

function ThreadDetail() {
  const { threadId } = useParams();
  const [comments, setComments] = useState(mockThread.comments);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, { id: comments.length + 1, text: newComment, author: "guest" }]);
    setNewComment("");
  };

  return (
    <div>
      <h2>{mockThread.title}</h2>
      <p>By {mockThread.author}</p>
      <p>{mockThread.content}</p>

      <h3>Comments ({comments.length})</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author}</strong>: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadDetail;
