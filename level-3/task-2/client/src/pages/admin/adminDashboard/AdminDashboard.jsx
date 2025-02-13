import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./admin-dashboard.css";
import { getProjectsCall, getTasksCall, getUsersCall } from '../../../apiCalls';
import AdminNavbar from '../../../components/adminNavbar/AdminNavbar';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // useEffect to fetch projects, tasks and users
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjectsCall();
      setProjects(res);
    };

    const fetchUsers = async () => {
      const res = await getUsersCall();
      setUsers(res);
    };
    const fetchTasks = async () => {
      const res = await getTasksCall();
      setTasks(res);
    };
    fetchProjects();
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <h1>Welcome, Admin!</h1>
          <p>Here's an overview of your projects</p>
        </header>
        <section className="dashboard-overview">
          <div className="overview-item">
            <h2>Total Projects</h2>
            <p>{ projects.length }</p>
          </div>
          <div className="overview-item">
            <h2>Total Users</h2>
            <p>{ users.length }</p>
          </div>
          <div className="overview-item">
            <h2>Tasks in Progress</h2>
            <p>{ tasks.filter((task) => task.status === "in progress").length}</p>
          </div>
          <div className="overview-item">
            <h2>Projects to Complete</h2>
            <p>{ projects.filter((project) => project.status !== "complete").length }</p>
          </div>
          <div className="overview-item">
            <h2>Projects to Assign</h2>
            <p>{ projects.filter((project) => !project.manager).length }</p>
          </div>
          <div className="overview-item">
            <h2>Tasks to Assign</h2>
            <p>{ tasks.filter((task) => !task.assignee).length }</p>
          </div>
        </section>
        <section className="dashboard-management">
          <div className="management-section">
            <h2>User Management</h2>
            <Link to="/admin/users">Manage Users</Link>
          </div>
          <div className="management-section">
            <h2>Project Management</h2>
            <Link to="/admin/projects">Manage Projects</Link>
          </div>
          <div className="management-section">
            <h2>Task Management</h2>
            <Link to="/admin/tasks">Manage Tasks</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
