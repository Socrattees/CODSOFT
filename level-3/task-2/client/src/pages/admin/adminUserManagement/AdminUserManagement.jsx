import React, { useState, useEffect } from "react";
import "./admin-user-management.css";
import { getProjectsCall, getUsersCall, deleteUserCall } from "../../../apiCalls";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../../components/adminNavbar/AdminNavbar";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  // Function to handle update user button
  const handleUpdate = (id) => {
    navigate(`/admin/users/${id}`, { state: { id } });
  };

  // Function to handle delete user button
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteUserCall(id);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle create user button
  const handleCreateUser = () => {
    navigate("/admin/users/create");
  };

  // Function to find project name by id
  const findProjectName = (id) => {
    const project = projects.find((project) => project._id === id);
    return project ? project.name : "Project not found";
  };

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

  return (
    <>
      <AdminNavbar />
      <div className="admin-u-m-user">
        <h2>User Management</h2>
        <button className="create-user-button" onClick={handleCreateUser}>Create User</button>
        <table className="admin-u-m-user-table">
          <thead>
            <tr>
              <th className="th-profile"></th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Projects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={
                      process.env.REACT_APP_PROFILE_FOLDER +
                      (user.profilePicture || "blankProfilePicture.png")
                    }
                    alt="profile"
                    className="profile-picture"
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.projects && user.projects.length > 0 ? (
                    <ul>
                      {user.projects.map((projectId) => (
                        <li key={projectId}>{findProjectName(projectId)}</li>
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
                <td className="td-actions">
                  <button id="admin-update-user" onClick={() => handleUpdate(user._id)}>Update</button>
                  <button id="admin-delete-user" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUserManagement;