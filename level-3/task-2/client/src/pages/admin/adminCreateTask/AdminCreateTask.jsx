import React, { useState, useEffect, useContext } from 'react';
import "./admin-create-task.css";
import { useNavigate } from 'react-router-dom';
import { createTaskCall, getUsersCall, getProjectsCall, getProjectCall } from '../../../apiCalls';
import { UserContext } from '../../../context/UserContext';

const AdminCreateTask = () => {
  const { user: currentUser } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [assignee, setAssignee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("low");
  const [projectUsers, setProjectUsers] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const newTask = {
        title,
        description,
        project,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        assignee,
        status,
        priority,
      };
      await createTaskCall(newTask, currentUser._id);
      setError("");
      navigate("/admin/tasks");
      console.log("Task created successfully");
    } catch (err) {
      setError("An error occurred during task creation");
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/admin/tasks");
  };

  // Function to get name of user by id
  const findUser = (id) => {
    const user = users.find((user) => user._id === id);
    return user ? user.username : "none";
  };

  // useEffect to fetch all users and projects
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const results = await getUsersCall();
        setUsers(results);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchAllProjects = async () => {
      try {
        const results = await getProjectsCall();
        setProjects(results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
    fetchAllProjects();
  }, []);

  // useEffect to fetch project details when a project is selected
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (project) {
        try {
          const projectDetails = await getProjectCall(project);
          const projectUsers = [projectDetails.manager, ...projectDetails.members];
          console.log(projectUsers);
          setProjectUsers(projectUsers);
          setAssignee(""); // Deselect current assignee
        } catch (err) {
          console.log(err);
        }
      } else {
        setProjectUsers([]);
      }
    };

    fetchProjectDetails();
  }, [project]);


  return (
    <div className="admin-create-task">
      <div className="admin-create-task-container">
        <div className="admin-create-task-form-wrapper">
          <h2>Create Task</h2>
          <form onSubmit={handleSubmit} className="admin-create-task-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              <label htmlFor="project">Project:</label>
              <select
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="">Select a project</option>
                {projects.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="assignee">Assignee:</label>
              <select
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                required
              >
                <option value="">Select an assignee</option>
                {projectUsers.map((user) => (
                  <option key={user} value={user}>
                    {findUser(user)}
                  </option>
                ))}
              </select>
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

export default AdminCreateTask;