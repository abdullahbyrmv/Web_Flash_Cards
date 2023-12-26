import React, { useState, useEffect } from "react";
import Functionalities from "./functionalities";
import Popup from "./popup";
import Cards from "./cards";
import NoCards from "./NoCards";
import "../assets/FlashCards.css";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newCardData, setNewCardData] = useState({
    question: "",
    status: "",
    answer: "",
  });
  const [editedCardData, setEditedCardData] = useState({
    question: "",
    status: "",
    answer: "",
  });
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [editingCardId, setEditingCardId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCheckboxPropagation = (e) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleShare = () => {
    const tickedCards = flashcards.filter((card) =>
      selectedCards.includes(card.id)
    );

    const tickedCardsData = tickedCards.map((card) => {
      const { question, status, answer, modificationDate } = card;
      return `Question: ${question}\nStatus: ${status}\nAnswer: ${answer}\nModification Date: ${formatModificationDate(
        modificationDate
      )}\n\n`;
    });

    const emailMessage = encodeURIComponent(tickedCardsData.join(""));
    const link = `mailto:?&body=${emailMessage}`;

    window.location.href = link;
  };

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
    if (!isEditing) {
      const updatedFlashcards = flashcards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      );
      setFlashcards(updatedFlashcards);
    }
  };

  const handleBackClick = (id) => {
    if (!isEditing) {
      const updatedFlashcards = flashcards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      );
      setFlashcards(updatedFlashcards);
    }
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
        setShowPopup(false);
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

  const findMaxId = (cards) => {
    return cards.reduce((maxId, card) => {
      return card.id > maxId ? card.id : maxId;
    }, 0);
  };

  const displayedCards = flashcards.filter((card) => {
    const { question, status, answer } = card;
    const searchValue = searchText.trim().toLowerCase();

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

  const handleDelete = (e, id) => {
    e.stopPropagation();

    const updatedFlashcards = flashcards.filter((card) => card.id !== id);

    fetch(`http://localhost:3001/flashcards/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete");
        }
        return response.json();
      })
      .then(() => {
        setFlashcards(updatedFlashcards);
      })
      .catch((error) => {
        window.alert("Error deleting card: " + error.message);
      });
  };

  const handleEdit = (e, id, question, status, answer) => {
    e.stopPropagation();
    setEditingCardId(id);
    setEditedCardData({
      question: question,
      status: status,
      answer: answer,
    });
  };

  const handleInputChangeEdit = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setEditedCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.stopPropagation();

    const { question, answer } = editedCardData;

    if (question.trim() === "" || answer.trim() === "") {
      window.alert("Please fill in all the fields");
      return;
    }

    const editedCard = {
      ...flashcards.find((card) => card.id === editingCardId),
      ...editedCardData,
      modificationDate: new Date().toISOString(),
    };

    const { isFlipped, ...editedCardInfo } = editedCard;

    fetch(`http://localhost:3001/flashcards/${editingCardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCardInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update");
        }
        return response.json();
      })
      .then(() => {
        fetchFlashcards();
        setEditingCardId(null);
      })
      .catch((error) => {
        window.alert("Error updating card: " + error.message);
      });
  };

  return (
    <div className="flashcards-container">
      <Functionalities
        handleOpenPopup={handleOpenPopup}
        setSearchText={setSearchText}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        searchText={searchText}
        setFlashcards={setFlashcards}
        flashcards={flashcards}
        handleShare={handleShare}
      />
      <Popup
        showPopup={showPopup}
        handleClosePopup={handleClosePopup}
        handleInputChange={handleInputChange}
        handleCreateNewCard={handleCreateNewCard}
        newCardData={newCardData}
      />
      {displayedCards.length === 0 && <NoCards />}
      <Cards
        displayedCards={displayedCards}
        handleFrontClick={handleFrontClick}
        handleBackClick={handleBackClick}
        handleEdit={handleEdit}
        handleSubmitEdit={handleSubmitEdit}
        editingCardId={editingCardId}
        editedCardData={editedCardData}
        setIsEditing={setIsEditing}
        handleInputChangeEdit={handleInputChangeEdit}
        handleDelete={handleDelete}
        formatModificationDate={formatModificationDate}
        handleCheckboxChange={handleCheckboxChange}
        selectedCards={selectedCards}
        handleCheckboxPropagation={handleCheckboxPropagation}
      />
    </div>
  );
};

export default Flashcards;
