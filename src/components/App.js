import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Flashcards from "./flash_cards";
import Contact from "./contact_me";
import NavigationBar from "./Navigation_Bar";
import "../assets/App.css";

const App = () => {
  return (
    <Router>
      <div className="content">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
