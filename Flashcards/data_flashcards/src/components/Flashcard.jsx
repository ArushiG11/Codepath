import React, { useState } from "react";
import "../styles/Flashcard.css";

const Flashcard = ({ question, answer, difficulty }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  }
  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${flipped ? "flipped" : ""} difficulty-${difficulty}`}>
        <div className="front">{question}</div>
        <div className="back ">{answer}</div>
      </div>
    </div>
  );
};

export default Flashcard;
