import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Flashcards from "./FlashCards";
import Contact from "./ContactMe";
import NavigationBar from "./NavigationBar";
import ErrorPage from "./ErrorPage";
import "../assets/App.css";

const App = () => {
  return (
    <Router>
      <div className="content">
        <NavigationBar />
        <Routes>
          <Route path="/Web_Flash_Cards" element={<Home />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
