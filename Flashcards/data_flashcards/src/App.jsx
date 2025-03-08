import React, { useState } from "react";
import Flashcard from "./components/Flashcard";
import "./App.css"; 

// Sample flashcards data
const flashcards = [
  { question: "What is ETL?", answer: "Extract, Transform, Load.", difficulty: "easy" },
  { question: "What is a Data Pipeline?", answer: "Automated data flow.", difficulty: "medium" },
  { question: "What is a Data Warehouse?", answer: "Centralized data storage.", difficulty: "hard" },
  { question: "What is Big Data?", answer: "Large, complex datasets.", difficulty: "easy" },
  { question: "What is Hadoop?", answer: "Open-source framework for big data.", difficulty: "medium" },
  { question: "What is a Data Engineer?", answer: "Builds and maintains data systems.", difficulty: "hard" },
  { question: "What is SQL?", answer: "Structured Query Language.", difficulty: "easy" },
  { question: "What is NoSQL?", answer: "Non-relational database.", difficulty: "medium" },
  { question: "What is a Data Model?", answer: "Blueprint for data structure.", difficulty: "hard" },
  { question: "What is Data Governance?", answer: "Managing data availability and integrity.", difficulty: "easy" },
  { question: "What is a Data Mart?", answer: "Subset of a data warehouse.", difficulty: "medium" },
  { question: "What is Data Mining?", answer: "Discovering patterns in data.", difficulty: "hard" },
  { question: "What is a Schema?", answer: "Structure of a database.", difficulty: "easy" },
  { question: "What is an API?", answer: "Interface for software interaction.", difficulty: "medium" },
  { question: "What is Cloud Computing?", answer: "On-demand computing resources.", difficulty: "hard" },
  { question: "What is Data Visualization?", answer: "Representing data graphically.", difficulty: "easy" },
  { question: "What is Machine Learning?", answer: "Algorithms that learn from data.", difficulty: "medium" },
  { question: "What is Artificial Intelligence?", answer: "Simulating human intelligence.", difficulty: "hard" },
  { question: "Explain Normalization in databases.", answer:"Organizing data to reduce redundancy.", difficulty: "medium" },
  { question:"Explain Denormalization in databases",answer:"Combining tables to improve read performance.", difficulty: "hard" },
  { question: "What is a Data Lake?", answer: "A storage system for raw data." , difficulty: "easy" },
  { question: "Difference between SQL and NoSQL?", answer: "SQL is structured, NoSQL is flexible." , difficulty: "medium" },
  { question: "What is Apache Spark?", answer: "A fast, distributed processing framework.", difficulty: "medium" },
  { question: "What is Kafka used for?", answer: "Real-time streaming data." , difficulty: "medium" },
  { question: "Explain Data Warehousing.", answer: "Storing and analyzing structured data.", difficulty: "medium" },
  { question: "What is Snowflake?", answer: "A cloud-based data warehouse." , difficulty: "easy" },
  { question: "What is an OLAP system?", answer: "Optimized for analytics and queries." , difficulty: "medium" },
  { question: "What is a DAG in Airflow?", answer: "Defines task dependencies in workflows." , difficulty: "medium" },
  { question: "What is the CAP Theorem?", answer: "Consistency, Availability, Partition Tolerance." , difficulty: "easy" },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * flashcards.length));

  const showNextCard = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
  };
  const currentCard = flashcards[currentIndex]
  return (
    <div className="app-container">
      <div className="card-info">
        <h1>Data Engineering Flashcards</h1>
        <p>Total Cards: {flashcards.length}</p>
      </div>
      <Flashcard key={currentIndex} 
        question={currentCard.question}
        answer={currentCard.answer}
        difficulty={currentCard.difficulty} />
      <button className="next-btn" onClick={showNextCard}>Next</button>
    </div>
  );
};

export default App;
