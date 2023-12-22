import React, { useEffect, useState } from 'react';
import styles from '../styles/UserList.module.css';

const UserList = ({ onSelectUser, onAddUser, onDeleteUser }) => {
  const [users, setUsers] = useState([]); // State for storing the list of users
  const [newUserName, setNewUserName] = useState(''); // State for the new user's name input
  const [newUserEmail, setNewUserEmail] = useState(''); // State for the new user's email input

  // Fetching users from the API on component mount
  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle adding a new user
  const handleAddUser = () => {
    const newUser = {
      id: Date.now(), // Mock ID for the new user
      first_name: newUserName.split(' ')[0],
      last_name: newUserName.split(' ')[1] || '',
      email: newUserEmail,
      avatar: 'https://reqres.in/img/faces/10-image.jpg', // Placeholder image
    };

    setUsers([...users, newUser]); // Updating the users state
    onAddUser(newUser); // Notifying the parent component
  };

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers); // Updating the users state
    onDeleteUser(userId); // Notifying the parent component
  };

  return (
    <div className={styles.userList}>
      <h2>User List</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.first_name} {user.last_name}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
