import React, { useState, useEffect } from "react";
import "./admin-project-management.css";
import { getProjectsCall, getUsersCall } from "../../apiCalls";
import { useNavigate } from "react-router-dom";

const AdminProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    console.log("Update project with id: ", id);
    navigate(`/admin/projects/${id}`, { state: { id } });
  };

  const handleDelete = async (id) => {
    console.log("Delete project with id: ", id);
  };

  const handleViewDetails = (id) => {
    console.log("View details of project with id: ", id);
    navigate(`/admin/projects/details/${id}`, { state: { id } });
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
        setProjects(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

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
    <div className="admin-p-m-project">
      <h2>Project Management</h2>
      <table className="admin-p-m-project-table">
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
                <button id="admin-view-details" onClick={() => handleViewDetails(project._id)}>View Details</button>
                <button id="admin-update-project" onClick={() => handleUpdate(project._id)}>Update</button>
                <button id="admin-delete-project" onClick={() => handleDelete(project._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectManagement;