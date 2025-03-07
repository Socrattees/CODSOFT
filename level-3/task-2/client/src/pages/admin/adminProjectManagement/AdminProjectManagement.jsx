import React, { useState, useEffect, useContext } from "react";
import "./admin-project-management.css";
import { UserContext } from "../../../context/UserContext";
import { getProjectsCall, getUsersCall, deleteProjectCall } from "../../../apiCalls";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../../components/adminNavbar/AdminNavbar";

const AdminProjectManagement = () => {
  const { user:currentUser } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // Function to handle update
  const handleUpdate = (id) => {
    navigate(`/admin/projects/${id}`, { state: { id } });
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteProjectCall(id, currentUser._id);
      const updatedProjects = projects.filter((project) => project._id !== id);
      setProjects(updatedProjects);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle view details
  const handleViewDetails = (id) => {
    navigate(`/admin/projects/details/${id}`, { state: { id } });
  };

  // Function to handle create
  const handleCreate = () => {
    navigate(`/admin/projects/create`);
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
    <>
      <AdminNavbar />
      <div className="admin-p-m-project">
        <h2>Project Management</h2>
        <button className="create-project-button" onClick={handleCreate}>Create New Project</button>
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
    </>
  );
};

export default AdminProjectManagement;