import React, { useState, useEffect } from "react";
import projectsInfo from "../projectsInfo";
import "../assets/Home.css";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsInfo);
  }, []);

  return (
    <div className="home-container">
      <div className="about-me">
        <h3>About Me</h3>
        {"My name is Abdullah"}
        <h3>My Projects</h3>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <div className="project-div">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
