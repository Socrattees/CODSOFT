import React, { useState, useEffect } from "react";
import "./admin-user-management.css";
import { getUsersCall } from "../../apiCalls";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    console.log("Delete user with id: ", id);
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

  return (
    <div className="admin-u-m-user">
      <h2>User Management</h2>
      <table className="admin-u-m-user-table">
        <thead>
          <tr>
            <th className="th-profile"></th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
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
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;