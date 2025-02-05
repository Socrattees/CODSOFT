import React from 'react';
import { Link } from 'react-router-dom';
import "./admin-dashboard.css";

const AdminDashboard = () => {


  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, Admin!</h1>
        <p>Here's an overview of your project management tool.</p>
      </header>
      <section className="dashboard-overview">
        <div className="overview-item">
          <h2>Total Projects</h2>
          <p>15</p>
        </div>
        <div className="overview-item">
          <h2>Total Users</h2>
          <p>50</p>
        </div>
        <div className="overview-item">
          <h2>Tasks in Progress</h2>
          <p>25</p>
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
      <section className="dashboard-analytics">
        <h2>Analytics and Reporting</h2>
        <p>View detailed reports and charts.</p>
      </section>
      <section className="dashboard-settings">
        <h2>Settings and Configuration</h2>
        <Link to="/admin/settings">Configure Settings</Link>
      </section>
    </div>
  );
};

export default AdminDashboard;
