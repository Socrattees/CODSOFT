import React, { useState, useEffect } from 'react';
import "./admin-create-project.css";
import { useNavigate } from 'react-router-dom';
import { createProjectCall, getUsersCall } from '../../apiCalls';

const AdminCreateProject = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [manager, setManager] = useState("");
  const [members, setMembers] = useState([]);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("low");
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if member is also the manager and remove from members list if true
    let updatedMembers = members; // Copy members array to avoid state issues
    if (manager && members.includes(manager)) {
      updatedMembers = members.filter((member) => member !== manager);
    }

    try {
      const newProject = {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        manager,
        members: updatedMembers,
        status,
        priority,
      };
      console.log(newProject);
      await createProjectCall(newProject);
      setError("");
      navigate("/admin/projects");
      console.log("Project created successfully");
    } catch (err) {
      setError("An error occurred during creation");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/admin/projects");
  };

  const handleAddMember = (userId) => {
    if (userId && !members.includes(userId)) {
      setMembers((prevMembers) => [...prevMembers, userId]);
    }
  };

  const handleRemoveMember = (userId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this member from the project?");
    if (!confirmRemove) {
      return;
    }
    setMembers((prevMembers) => prevMembers.filter((member) => member !== userId));
  };

  // useEffect to fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const results = await getUsersCall();
        setAllUsers(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="admin-create-project">
      <div className="admin-create-project-container">
        <div className="admin-create-project-form-wrapper">
          <h2>Create Project</h2>
          <form onSubmit={handleSubmit} className="admin-create-project-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="manager">Manager:</label>
              <select
                id="manager"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                required
              >
                <option value="">Select a manager</option>
                {allUsers
                  .filter((user) => user.role === "manager")
                  .map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
              </select>
            </div>
            <div className="project-members">
              <h3>Project Members</h3>
              {members && members.length > 0 ? (
                <ul>
                  {members.map((userId) => {
                    const user = allUsers.find((u) => u._id === userId);
                    return user ? (
                      <li key={user._id}>
                        {user.username}
                        <button type="button" onClick={() => handleRemoveMember(user._id)}>Remove</button>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p>No members assigned</p>
              )}
              <div className="add-member">
                <h4>Add Member</h4>
                <select onChange={(e) => handleAddMember(e.target.value)}>
                  <option value="">Select a member</option>
                  {allUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-buttons">
              <button className="cancel-button" type="button" onClick={handleCancel}>Cancel</button>
              <button className="submit-button" type="submit">Create</button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateProject;
