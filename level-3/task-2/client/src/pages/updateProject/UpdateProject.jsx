import React, { useContext, useEffect, useState } from 'react';
import "./update-project.css";
import { UserContext } from '../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjectCall, updateProjectCall, getUsersCall } from '../../apiCalls';
import Navbar from '../../components/navbar/NavBar';

const UpdateProject = () => {
  const { user: currentUser } = useContext(UserContext);

  const [project, setProject] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [manager, setManager] = useState("");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Function to format date to "yyyy-mm-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Check if the project details have changed
    if (
      name === project.name &&
      description === project.description &&
      startDate === project.startDate &&
      endDate === project.endDate &&
      manager === project.manager &&
      JSON.stringify(members) === JSON.stringify(project.members) &&
      JSON.stringify(tasks) === JSON.stringify(project.tasks) &&
      status === project.status &&
      priority === project.priority
    ) {
      return;
    }
    // Confirm the update
    const confirmUpdate = window.confirm("Are you sure you want to update this project?");
    if (!confirmUpdate) {
      return;
    }
    // Check if member is also the manager and remove from members list if true
    let updatedMembers = members; // Copy members array to avoid state issues
    if (manager && members.includes(manager)) {
      updatedMembers = members.filter((member) => member !== manager);
    }
    try {
      const updatedProject = {
        name,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        manager,
        members: updatedMembers,
        tasks,
        status,
        priority,
      };
      await updateProjectCall(project._id, updatedProject, currentUser._id);
      setError("");
      navigate("/home/projects");
      console.log("Project updated successfully");
    } catch (err) {
      setError("An error occurred during update");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/home/projects");
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

  // useEffect to fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProjectCall(location.state.id);
        setProject(project);
        setName(project.name);
        setDescription(project.description);
        setStartDate(formatDate(project.startDate));
        setEndDate(formatDate(project.endDate));
        setManager(project.manager);
        setMembers(project.members);
        setTasks(project.tasks);
        setStatus(project.status);
        setPriority(project.priority);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [location.state.id]);

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
    <>
      <Navbar />
      <div className="update-project">
        <div className="update-project-container">
          <div className="update-project-form-wrapper">
            <h2>Update Project</h2>
            <form onSubmit={handleSubmit} className="update-project-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder={project.name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  placeholder={project.description}
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
                  readOnly
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
                <button className="submit-button" type="submit">Update</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProject;
