import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/flashcards")
      .then((response) => response.json())
      .then((flashcards) => {
        const sortedFlashcards = flashcards
          .map((card) => ({ ...card, isFlipped: false }))
          .sort((card1, card2) => {
            const card1_modificationDate = new Date(
              formatModificationDate(card1.modificationDate)
            ).getTime();
            const card2_modificationDate = new Date(
              formatModificationDate(card2.modificationDate)
            ).getTime();
            return card2_modificationDate - card1_modificationDate;
          });
        setFlashcards(sortedFlashcards);
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

  const padDate = (dateField) => {
    if (dateField < 10) {
      return `0${dateField}`;
    } else {
      return `${dateField}`;
    }
  };

  const formatModificationDate = (modificationDate) => {
    const date = new Date(modificationDate);
    return `${date.getFullYear()}-${padDate(date.getMonth() + 1)}-${padDate(
      date.getDate()
    )} ${padDate(date.getHours())}:${padDate(date.getMinutes())}:${padDate(
      date.getSeconds()
    )}`;
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
                  Last Modified: {formatModificationDate(card.modificationDate)}
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
