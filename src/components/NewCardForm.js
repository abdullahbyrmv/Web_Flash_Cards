import React, { useState } from "react";
import "../assets/NewCardForm.css";

const NewCardForm = ({ setShowNewCardForm, flashcards, fetchFlashcards }) => {
  const [newCardData, setNewCardData] = useState({
    question: "",
    status: "",
    answer: "",
  });

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

  const findMaxId = (cards) => {
    return cards.reduce((maxId, card) => {
      return card.id > maxId ? card.id : maxId;
    }, 0);
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

    const maxId = findMaxId(flashcards);

    const newCard = {
      id: maxId + 1,
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
      })
      .catch((error) => {
        window.alert("Error adding new card:" + error.message);
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="text"
          name="question"
          value={newCardData.question}
          onChange={handleInputChange}
          placeholder="Enter question"
          required
        />
        <select
          name="status"
          value={newCardData.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Choose status</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <input
          type="text"
          name="answer"
          value={newCardData.answer}
          onChange={handleInputChange}
          placeholder="Enter answer"
          required
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
