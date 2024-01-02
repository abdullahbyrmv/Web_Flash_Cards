import "../assets/Project.css";

const Project = ({ title, description, source }) => {
  return (
    <>
      <h4 className="project-title">{title}</h4>
      <p className="project-description">{description}</p>
      <a href={source} target="_blank" rel="noopener noreferrer">
        <button className="view-button">View Project</button>
      </a>
    </>
  );
};

export default Project;
