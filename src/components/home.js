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
        <h3>Welcome To My React Application</h3>
        {
          <p>
            My name is Abdullah Bayramov and I am 3rd year IT student at ADA
            University.
          </p>
        }
        <h3>My Projects</h3>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <div className="project-div">
            <h4 className="project-title">{project.title}</h4>
            <p className="project-description">{project.description}</p>
            <a href={project.source} target="_blank" rel="noopener noreferrer">
              <button className="view-button">View Project</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
