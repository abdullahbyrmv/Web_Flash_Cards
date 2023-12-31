import React, { useState, useEffect } from "react";
import "../assets/NewCardForm.css";

const NewCardForm = ({ setShowNewCardForm, flashcards, fetchFlashcards }) => {
  const [newCardData, setNewCardData] = useState({
    question: "",
    status: "",
    answer: "",
  });
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const maxId = flashcards.reduce(
      (maxId, card) => Math.max(maxId, card.id),
      0
    );
    setNextId(maxId + 1);
  }, [flashcards]);

  const handleInputChange = (NewCardForm) => {
    const { name, value } = NewCardForm.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseNewCardForm = () => {
    setShowNewCardForm(false);
    setNewCardData({
      question: "",
      status: "",
      answer: "",
    });
  };

  const handleCreateNewCard = () => {
    if (
      newCardData.question.trim() === "" ||
      newCardData.answer.trim() === ""
    ) {
      window.alert("Please fill in all fields");
      return;
    }
    if (newCardData.status.trim() === "") {
      window.alert("Please Select a Status");
      return;
    }

    const newCard = {
      id: nextId,
      ...newCardData,
      modificationDate: new Date().toISOString(),
    };

    fetch("http://localhost:3001/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        return response.json();
      })
      .then(() => {
        fetchFlashcards();
        setShowNewCardForm(false);
        setNewCardData({
          question: "",
          status: "",
          answer: "",
        });
        setNextId((prevId) => prevId + 1);
      })
      .catch((error) => {
        window.alert("Error adding new card:" + error.message);
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <textarea
          type="text"
          name="question"
          value={newCardData.question}
          onChange={handleInputChange}
          placeholder="Enter question for new card"
        />
        <select
          name="status"
          value={newCardData.status}
          onChange={handleInputChange}
        >
          <option value="">Choose status</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <textarea
          className="new-card-textarea-answer"
          type="text"
          name="answer"
          value={newCardData.answer}
          onChange={handleInputChange}
          placeholder="Enter answer for new card"
        />
        <div className="popup-buttons">
          <button className="new-card-button" onClick={handleCreateNewCard}>
            Submit
          </button>
          <button className="new-card-button" onClick={handleCloseNewCardForm}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCardForm;
