import React from "react";
import "../assets/EditForm.css";

const EditForm = ({
  editedCardData,
  handleInputChangeEdit,
  setIsEditing,
  handleSubmitEdit,
}) => {
  return (
    <div className="blur-background">
      <div className="edit-form-container">
        <div className="edit-form">
          <label className="edit-question">Question</label>
          <textarea
            className="edit-area"
            type="text"
            name="question"
            value={editedCardData.question}
            onChange={(e) => {
              handleInputChangeEdit(e);
              setIsEditing(true);
            }}
            onBlur={() => setIsEditing(false)}
            onClick={(e) => e.stopPropagation()}
          />
          <label className="edit-status">Status</label>
          <select
            name="status"
            value={editedCardData.status}
            onChange={(e) => {
              handleInputChangeEdit(e);
              setIsEditing(true);
            }}
            onBlur={() => setIsEditing(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <option>Learned</option>
            <option>Want to Learn</option>
            <option>Noted</option>
          </select>
          <label className="edit-answer">Answer</label>
          <textarea
            className="edit-area"
            type="text"
            name="answer"
            value={editedCardData.answer}
            onChange={(e) => {
              handleInputChangeEdit(e);
              setIsEditing(true);
            }}
            onBlur={() => setIsEditing(false)}
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={(e) => handleSubmitEdit(e)}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
