import React, { useState, useEffect } from "react";
import "../assets/FlashCards.css";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCardData, setNewCardData] = useState({
    question: "",
    status: "",
    answer: "",
  });
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
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
  };

  const handleFrontClick = (id) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setFlashcards(updatedFlashcards);
  };

  const handleBackClick = (id) => {
    const updatedFlashcards = flashcards.map((card) =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setFlashcards(updatedFlashcards);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewCardData({
      question: "",
      status: "",
      answer: "",
    });
  };

  const handleInputChange = (popup) => {
    const { name, value } = popup.target;
    setNewCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateNewCard = () => {
    const newCard = {
      id: flashcards.length + 1,
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
        setShowPopup(false);
      })
      .catch((error) => {
        window.alert("Error adding new card:" + error.message);
      });
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

  const displayedCards = flashcards.filter((card) => {
    const { question, status, answer } = card;
    const searchValue = searchText.toLowerCase();

    if (selectedStatus !== "All Statuses") {
      return (
        (question.toLowerCase().includes(searchValue) ||
          status.toLowerCase().includes(searchValue) ||
          answer.toLowerCase().includes(searchValue)) &&
        status.toLowerCase() === selectedStatus.toLowerCase()
      );
    } else {
      return (
        question.toLowerCase().includes(searchValue) ||
        status.toLowerCase().includes(searchValue) ||
        answer.toLowerCase().includes(searchValue)
      );
    }
  });

  const handleButtonClick = (e, cardId) => {
    e.stopPropagation();
    console.log(cardId);
  };

  return (
    <div className="flashcards-container">
      <div className="functionalities">
        <button className="new-card-button" onClick={handleOpenPopup}>
          Create New Card
        </button>
        <input
          className="search-bar"
          type="text"
          placeholder="Search by question, status or answer."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Learned</option>
          <option>Want to Learn</option>
          <option>Noted</option>
        </select>
      </div>
      {showPopup && (
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
            <input
              type="text"
              name="status"
              value={newCardData.status}
              onChange={handleInputChange}
              placeholder="Enter status"
              required
            />
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
              <button className="new-card-button" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="cards-grid">
        {displayedCards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""}`}
            onClick={() => handleFrontClick(card.id)}
          >
            <div className="card-inner">
              <div
                className="card-front"
                style={{ opacity: card.isFlipped ? 0 : 1 }}
              >
                <p className="question">{card.question}</p>
                <p className="status">Status: {card.status}</p>
                <p className="date">
                  Last Modified: {formatModificationDate(card.modificationDate)}
                </p>

                <div className="front-buttons">
                  <button
                    className="edit-button"
                    onClick={(e) => handleButtonClick(e, card.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => handleButtonClick(e, card.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                className="card-back"
                style={{ opacity: card.isFlipped ? 1 : 0 }}
                onClick={() => {
                  handleBackClick(card.id);
                }}
              >
                <p>{card.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
