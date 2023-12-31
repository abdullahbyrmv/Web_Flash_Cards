import React, { useState } from "react";
import "../assets/ContactMe.css";

const Contact = () => {
  const [message, setMessage] = useState({
    id: "",
    subject: "",
    email: "",
    content: "",
  });

  const handleInput = (form) => {
    const { name, value } = form.target;

    const form_value = { ...message };
    form_value[name] = value;

    setMessage(form_value);
  };

  const handleSubmit = async (submit) => {
    submit.preventDefault();

    if (
      message.subject.trim() === "" ||
      message.email.trim() === "" ||
      message.content.trim() === ""
    ) {
      window.alert("Please fill in all fields before sending.");
      return;
    }

    if (!message.email.trim().includes("@")) {
      window.alert("Please provide correct email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        window.alert("Message sent successfully!");
        setMessage({
          id: "",
          subject: "",
          email: "",
          content: "",
        });
      } else {
        window.alert("Failed to send message!");
      }
    } catch (error) {
      window.alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1 className="header">Contact Me</h1>
      <div className="contact-form">
        <div>
          <input
            className="contact-me-input"
            type="text"
            id="subject"
            name="subject"
            value={message.subject}
            onChange={handleInput}
            placeholder="Subject..."
          />
        </div>
        <div>
          <input
            className="contact-me-input"
            type="email"
            id="email"
            name="email"
            value={message.email}
            onChange={handleInput}
            placeholder="Email..."
          />
        </div>
        <div>
          <textarea
            className="contact-me-textarea"
            id="content"
            name="content"
            value={message.content}
            onChange={handleInput}
            placeholder="Write your message..."
          ></textarea>
        </div>
        <button
          className="contact-me-button"
          onClick={handleSubmit}
          type="submit"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Contact;
