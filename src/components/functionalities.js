import React from "react";
import "../assets/Functionalities.css";

const Functionalities = ({
  handleOpenPopup,
  setSearchText,
  setSelectedStatus,
  selectedStatus,
  searchText,
  setFlashcards,
  flashcards,
  handleShare,
}) => {
  const handleSort = (e) => {
    const sortOption = e.target.value;

    let Cards = [...flashcards];

    switch (sortOption) {
      case "Date (asc)":
        Cards.sort(
          (card1, card2) =>
            new Date(card1.modificationDate) - new Date(card2.modificationDate)
        );
        break;
      case "Date (desc)":
        Cards.sort(
          (card1, card2) =>
            new Date(card2.modificationDate) - new Date(card1.modificationDate)
        );
        break;
      case "id (asc)":
        Cards.sort((card1, card2) => card1.id - card2.id);
        break;
      case "id (desc)":
        Cards.sort((card1, card2) => card2.id - card1.id);
        break;
      default:
        Cards.sort(
          (card1, card2) =>
            new Date(card2.modificationDate) - new Date(card1.modificationDate)
        );
        break;
    }
    setFlashcards(Cards);
  };

  return (
    <div className="functionalities">
      <button className="new-card-button" onClick={handleOpenPopup}>
        Create New Card
      </button>
      <button className="share-button" onClick={handleShare}>
        Share
      </button>
      <input
        className="search-bar"
        type="text"
        placeholder="Search by question, status or answer."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select
        className="select-bar"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option>All Statuses</option>
        <option>Learned</option>
        <option>Want to Learn</option>
        <option>Noted</option>
      </select>
      <select className="select-bar" onChange={handleSort}>
        <option>Sort By</option>
        <option>Date (asc)</option>
        <option>Date (desc)</option>
        <option>id (asc)</option>
        <option>id (desc)</option>
      </select>
    </div>
  );
};

export default Functionalities;
