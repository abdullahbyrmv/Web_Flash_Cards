import React, { useState, useEffect } from "react";
import projectsInfo from "../ProjectsInfo";
import Project from "./Project";
import "../assets/Home.css";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsInfo);
  }, []);

  return (
    <div className="home-container">
      <div className="about-me">
        <h3>Welcome to My React Application</h3>
        {
          <p>
            My name is Abdullah Bayramov, and I am 3rd year IT student at ADA
            University.
          </p>
        }
        <h3>My Projects</h3>
      </div>
      <div className="projects">
        {projects.map((project) => (
          <div key={project.id} className="project-div">
            <Project
              key={project.id}
              title={project.title}
              description={project.description}
              source={project.source}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
