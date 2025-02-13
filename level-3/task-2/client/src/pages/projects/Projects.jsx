import React, { useState, useEffect, useContext } from "react";
import "./projects.css";
import { UserContext } from "../../context/UserContext";
import { getProjectsCall, getUsersCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/NavBar";

const Projects = () => {
  const { user: currentUser } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    console.log("Update project with id: ", id);
    navigate(`/home/projects/${id}`, { state: { id } });
  };

  const handleViewDetails = (id) => {
    console.log("View details of project with id: ", id);
    navigate(`/home/projects/details/${id}`, { state: { id } });
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine if the end date is within a week
  const isLessThanAWeekLeft = (endDate) => {
    const currentDate = new Date();
    const end = new Date(endDate);
    const diffTime = end - currentDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays < 7;
  };

  // Function to find the manager of a project
  const findManager = (id) => {
    const user = users.find((user) => user._id === id);
    return user ? user.username : "none";
  };

  // useEffect to fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjectsCall();
        const filteredProjects = res.filter(
          (project) =>
            project.manager === currentUser._id ||
            project.members.includes(currentUser._id)
        );
        setProjects(filteredProjects);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, [currentUser]);

  // useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsersCall();
        setUsers(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="projects">
        <h2>Projects</h2>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Manager</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{findManager(project.manager)}</td>
                <td>{formatDate(project.startDate)}</td>
                <td className={isLessThanAWeekLeft(project.endDate) ? "project-deadline-soon" : ""}>
                  {formatDate(project.endDate)}
                </td>
                <td>{project.status}</td>
                <td className={`priority-${project.priority}`}>{project.priority}</td>
                <td className="td-actions">
                  <button id="view-details" onClick={() => handleViewDetails(project._id)}>View Details</button>
                  {project.manager === currentUser._id && (
                    <button id="update-project" onClick={() => handleUpdate(project._id)}>Update</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projects;
