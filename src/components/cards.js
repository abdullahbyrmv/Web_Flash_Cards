import React, { useState } from "react";
import EditForm from "./EditForm";
import Card from "./Card";
import "../assets/Cards.css";

const Cards = ({
  flashcards,
  setFlashcards,
  displayedCards,
  handleEdit,
  handleSubmitEdit,
  editingCardId,
  editedCardData,
  handleInputChangeEdit,
  formatModificationDate,
  handleCheckboxChange,
  selectedCards,
}) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEditForm = (e, card) => {
    handleEdit(e, card.id, card.question, card.status, card.answer);
    setIsEditFormOpen(true);
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

  const handleCheckboxPropagation = (e) => {
    e.stopPropagation();
  };

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

  return (
    <div>
      <div className="cards-grid">
        {displayedCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleFrontClick={handleFrontClick}
            handleCheckboxChange={handleCheckboxChange}
            selectedCards={selectedCards}
            handleCheckboxPropagation={handleCheckboxPropagation}
            handleOpenEditForm={handleOpenEditForm}
            handleDelete={handleDelete}
            formatModificationDate={formatModificationDate}
            handleBackClick={handleBackClick}
          />
        ))}
      </div>
      {isEditFormOpen && editingCardId !== null && (
        <EditForm
          editedCardData={editedCardData}
          handleInputChangeEdit={handleInputChangeEdit}
          setIsEditing={setIsEditing}
          handleSubmitEdit={handleSubmitEdit}
        />
      )}
    </div>
  );
};

export default Cards;
