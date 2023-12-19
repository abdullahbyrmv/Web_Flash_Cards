import React, { useState } from "react";
import "../assets/ContactMe.css";

const Contact = () => {
  const [messages, setMessages] = useState({
    id: "",
    subject: "",
    email: "",
    content: "",
  });

  const handleInput = (form) => {
    const { name, value } = form.target;

    const form_value = { ...messages };
    form_value[name] = value;

    setMessages(form_value);
  };

  const handleSubmit = async (submit) => {
    submit.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });

      if (response.ok) {
        window.alert("Message sent successfully!");
      } else {
        window.alert("Failed to send message!");
      }
    } catch (error) {
      window.alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="subject"
            name="subject"
            value={messages.subject}
            onChange={handleInput}
            required
            placeholder="Subject..."
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={messages.email}
            onChange={handleInput}
            required
            placeholder="Email..."
          />
        </div>
        <div>
          <textarea
            id="content"
            name="content"
            value={messages.content}
            onChange={handleInput}
            required
            placeholder="Write your message..."
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
