import React from "react";

const Card = ({
  card,
  handleFrontClick,
  handleCheckboxChange,
  selectedCards,
  handleCheckboxPropagation,
  handleOpenEditForm,
  handleDelete,
  formatModificationDate,
  handleBackClick,
}) => {
  return (
    <div
      key={card.id}
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={() => handleFrontClick(card.id)}
    >
      <div className="card-inner">
        <div className="card-front" style={{ opacity: card.isFlipped ? 0 : 1 }}>
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
              onClick={(e) => handleOpenEditForm(e, card)}
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
  );
};

export default Card;
