import React, { useContext, useEffect, useState } from 'react';
import "./admin-update-task.css";
import { UserContext } from '../../../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTaskCall, updateTaskCall, getUsersCall, getProjectCall } from '../../../apiCalls';
import AdminNavbar from '../../../components/adminNavbar/AdminNavbar';

const AdminUpdateTask = () => {
  const { user: currentUser } = useContext(UserContext);

  const [task, setTask] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState({});
  const [assignee, setAssignee] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Check if the task details have changed
    if (
      title === task.title &&
      description === task.description &&
      startDate === task.startDate &&
      endDate === task.endDate &&
      assignee === task.assignee &&
      status === task.status &&
      priority === task.priority
    ) {
      return;
    }
    // Confirm the update
    const confirmUpdate = window.confirm("Are you sure you want to update this task?");
    if (!confirmUpdate) {
      return;
    }
    try {
      const updatedTask = {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        assignee,
        status,
        priority,
      };
      await updateTaskCall(task._id, updatedTask, currentUser._id);
      setError("");
      navigate("/admin/tasks");
      console.log("Task updated successfully");
    } catch (err) {
      setError("An error occurred during update");
    }
  };

  // Function to handle cancel button
  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (!confirmCancel) {
      return;
    }
    navigate("/admin/tasks");
  };

  // useEffect to fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskCall(location.state.id);
        console.log(task);
        setTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setStartDate(formatDate(task.startDate));
        setEndDate(formatDate(task.endDate));
        setAssignee(task.assignee);
        setStatus(task.status);
        setPriority(task.priority);
        const project = await getProjectCall(task.project);
        setProject(project);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTask();
  }, [location.state.id]);

  // useEffect to fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const results = await getUsersCall();
        const projectUsers = results.filter(user => 
          project.members.includes(user._id) || user._id === project.manager
        );
        setAllUsers(projectUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (project.members) {
      fetchAllUsers();
    }
  }, [project]);

  return (
    <>
      <AdminNavbar />
      <div className="admin-update-task">
        <div className="admin-update-task-container">
          <div className="admin-update-task-form-wrapper">
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit} className="admin-update-task-form">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  placeholder={task.title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  placeholder={task.description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="project">Project:</label>
                <input
                  type="text"
                  id="project"
                  value={project.name}
                  readOnly
                />
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
                  {allUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
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

export default AdminUpdateTask;
