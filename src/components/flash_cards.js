import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/flashcards")
      .then((response) => response.json())
      .then((flashcards) => {
        setFlashcards(
          flashcards.map((card) => ({
            ...card,
            isFlipped: false,
          }))
        );
      })
      .catch((error) => {
        window.alert("Error fetching data: " + error.message);
      });
  }, []);

  const handleFrontClick = (index) => {
    const updatedFlashcards = flashcards.map((card, i) =>
      i === index ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setFlashcards(updatedFlashcards);
  };

  const handleBackClick = (index) => {
    const updatedFlashcards = flashcards.map((card, i) =>
      i === index ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="flashcards-container">
      <div className="cards-grid">
        {flashcards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""}`}
            onClick={() => handleFrontClick(index)}
          >
            <div className="card-inner">
              <div
                className="card-front"
                style={{ opacity: card.isFlipped ? 0 : 1 }}
              >
                <p>{card.question}</p>
                <p>
                  Last Modified: {new Date(card.modificationDate).toString()}
                </p>
                <p>Status: {card.status}</p>
              </div>
              <div
                className="card-back"
                style={{ opacity: card.isFlipped ? 1 : 0 }}
                onClick={() => {
                  handleBackClick(index);
                }}
              >
                <p>Answer: {card.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
