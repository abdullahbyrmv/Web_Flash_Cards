import React from "react";
import "../assets/NewCardForm.css";

const NewCardForm = ({
  showPopup,
  handleClosePopup,
  handleInputChange,
  handleCreateNewCard,
  newCardData,
}) => {
  return (
    showPopup && (
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
            <button className="new-card-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default NewCardForm;
