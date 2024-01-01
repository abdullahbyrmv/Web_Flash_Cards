import React, { useState, useEffect } from "react";
import Functionalities from "./Functionalities";
import NewCardForm from "./NewCardForm";
import Cards from "./Cards";
import NoCards from "./NoCards";
import InfiniteScroll from "react-infinite-scroll-component";
import "../assets/FlashCards.css";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [editedCardData, setEditedCardData] = useState({
    question: "",
    status: "",
    answer: "",
  });
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [editingCardId, setEditingCardId] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [maximumCards, setMaximumCards] = useState(6);

  const loadMoreCards = () => {
    setTimeout(() => {
      setMaximumCards((initialCards) => initialCards + 6);
    }, 1500);
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

    if (tickedCards.length === 0) {
      window.alert("Please select at least 1 card to share");
      return;
    }

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

  const handleOpenNewCardForm = () => {
    setShowNewCardForm(true);
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

  const displayedCards = flashcards
    .filter((card) => {
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
    })
    .slice(0, maximumCards);

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
        handleOpenNewCardForm={handleOpenNewCardForm}
        setSearchText={setSearchText}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        searchText={searchText}
        setFlashcards={setFlashcards}
        flashcards={flashcards}
        handleShare={handleShare}
      />
      {showNewCardForm && (
        <NewCardForm
          setShowNewCardForm={setShowNewCardForm}
          flashcards={flashcards}
          fetchFlashcards={fetchFlashcards}
        />
      )}
      {displayedCards.length === 0 && <NoCards />}
      <InfiniteScroll
        dataLength={displayedCards.length}
        next={loadMoreCards}
        hasMore={displayedCards.length < flashcards.length}
        loader={<br></br>}
        endMessage={<br></br>}
      >
        <Cards
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          displayedCards={displayedCards}
          handleEdit={handleEdit}
          handleSubmitEdit={handleSubmitEdit}
          editingCardId={editingCardId}
          editedCardData={editedCardData}
          handleInputChangeEdit={handleInputChangeEdit}
          formatModificationDate={formatModificationDate}
          handleCheckboxChange={handleCheckboxChange}
          selectedCards={selectedCards}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Flashcards;
