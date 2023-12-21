import React from "react";

const Functionalities = ({
  handleOpenPopup,
  setSearchText,
  setSelectedStatus,
  selectedStatus,
  searchText,
}) => {
  return (
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
        className="select-bar"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option>All Statuses</option>
        <option>Learned</option>
        <option>Want to Learn</option>
        <option>Noted</option>
      </select>
    </div>
  );
};

export default Functionalities;
