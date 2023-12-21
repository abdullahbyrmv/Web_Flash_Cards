import React from "react";

const Popup = ({
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
    )
  );
};

export default Popup;
