import React, { useState } from "react";
import "../styles/Flashcard.css";

const Flashcard = ({ question, answer, difficulty , onNext, onBack, onShuffle, checkAnswer, currentStreak, longestStreak }) => {
  const [flipped, setFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = () => {
    const result = checkAnswer(userInput);
    setFeedback(result);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  }
  return (
    
    <div className="flashcard-container" onClick={handleFlip}>
      <div className="streak-container">
        <p>🔥 Current Streak: {currentStreak}</p>
        <p>🏆 Longest Streak: {longestStreak}</p>
      </div>
      <div className={`flashcard ${flipped ? "flipped" : ""} difficulty-${difficulty}`}>
        <div className="front">{question}</div>
        <div className="back ">{answer}</div>
      </div>
      <input
        type="text"
        placeholder="Enter your answer..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className={`answer-input ${feedback === "red" ? "incorrect" : feedback === "green" ? "correct" : ""}`}
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={handleSubmit} className="submit-btn">Submit</button>

      {/* {feedback && <p className="feedback">{feedback}</p>} */}

      <div className="nav-buttons">
        <button onClick={onBack} className="nav-btn">⬅ Back</button>
        <button className="shuffle-btn" onClick={onShuffle}>Shuffle</button>
        <button onClick={onNext} className="nav-btn">Next ➡</button>
      </div>
    </div>
  );
};

export default Flashcard;
