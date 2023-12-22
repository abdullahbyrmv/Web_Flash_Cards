import React from "react";

const Cards = ({
  displayedCards,
  handleFrontClick,
  handleBackClick,
  handleEdit,
  handleSubmitEdit,
  editingCardId,
  newCardData,
  handleInputChangeEdit,
  setIsEditing,
  handleDelete,
  formatModificationDate,
}) => {
  return (
    <div className="cards-grid">
      {displayedCards.map((card, index) => (
        <div
          key={card.id}
          className={`card ${card.isFlipped ? "flipped" : ""}`}
          onClick={() => handleFrontClick(card.id)}
        >
          <div className="card-inner">
            {editingCardId === card.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  name="question"
                  value={newCardData.question}
                  onChange={(e) => {
                    handleInputChangeEdit(e);
                    setIsEditing(true);
                  }}
                  onBlur={() => setIsEditing(false)}
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  type="text"
                  name="status"
                  value={newCardData.status}
                  onChange={(e) => {
                    handleInputChangeEdit(e);
                    setIsEditing(true);
                  }}
                  onBlur={() => setIsEditing(false)}
                  onClick={(e) => e.stopPropagation()}
                />
                <textarea
                  name="answer"
                  value={newCardData.answer}
                  onChange={(e) => {
                    handleInputChangeEdit(e);
                    setIsEditing(true);
                  }}
                  onBlur={() => setIsEditing(false)}
                  onClick={(e) => e.stopPropagation()}
                ></textarea>
                <button onClick={(e) => handleSubmitEdit(e)}>Submit</button>
              </div>
            ) : (
              <>
                <div
                  className="card-front"
                  style={{ opacity: card.isFlipped ? 0 : 1 }}
                >
                  <p className="question">{card.question}</p>
                  <p className="status">Status: {card.status}</p>
                  <p className="date">
                    Last Modified:{" "}
                    {formatModificationDate(card.modificationDate)}
                  </p>

                  <div className="front-buttons">
                    <button
                      className="edit-button"
                      onClick={(e) => handleEdit(e, card.id)}
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
                  <p>{card.answer}</p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
