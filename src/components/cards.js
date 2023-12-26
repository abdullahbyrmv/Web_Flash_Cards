import React from "react";
import EditForm from "./edit_form";
import "../assets/Cards.css";

const Cards = ({
  displayedCards,
  handleFrontClick,
  handleBackClick,
  handleEdit,
  handleSubmitEdit,
  editingCardId,
  editedCardData,
  handleInputChangeEdit,
  setIsEditing,
  handleDelete,
  formatModificationDate,
  handleCheckboxChange,
  selectedCards,
  handleCheckboxPropagation,
}) => {
  const openEditForm = () => {
    if (editingCardId !== null) {
      return (
        <EditForm
          editedCardData={editedCardData}
          handleInputChangeEdit={handleInputChangeEdit}
          setIsEditing={setIsEditing}
          handleSubmitEdit={handleSubmitEdit}
        />
      );
    }
    return null;
  };

  return (
    <div>
      {openEditForm()}
      <div className="cards-grid">
        {displayedCards.map((card) => (
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
                <div className="card-checkbox">
                  <input
                    type="checkbox"
                    className="check-box"
                    onChange={() => handleCheckboxChange(card.id)}
                    checked={selectedCards.includes(card.id)}
                    onClick={(e) => handleCheckboxPropagation(e)}
                  />
                </div>
                <p className="question">{card.question}</p>
                <p className="status">Status: {card.status}</p>
                <p className="date">
                  Last Modified: {formatModificationDate(card.modificationDate)}
                </p>
                <div className="front-buttons">
                  <button
                    className="edit-button"
                    onClick={(e) =>
                      handleEdit(
                        e,
                        card.id,
                        card.question,
                        card.status,
                        card.answer
                      )
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => handleDelete(e, card.id)}
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
                <p className="answer">{card.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
