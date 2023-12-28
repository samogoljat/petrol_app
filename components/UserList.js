import React, { useState, useEffect } from 'react';
import useUsers from './useUsers'; // Import the custom hook
import styles from '../styles/UserList.module.css';
import '../styles/loadingSpinnerStyles.css'

const UserList = ({ onSelectUser, onAddUser, onDeleteUser }) => {
  const { users, isLoading, error } = useUsers(); // Use the custom hook
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(), // Assuming id is a timestamp for simplicity
      first_name: newUserName.split(' ')[0],
      last_name: newUserName.split(' ')[1] || '',
      email: newUserEmail,
      avatar: 'https://reqres.in/img/faces/10-image.jpg', // Placeholder avatar
    };

    const newUsersList = [...users, newUser];
    setUsers(newUsersList);
    setFilteredUsers(newUsersList);
    onAddUser(newUser); // Call the provided onAddUser function
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = (userId, event) => {
    event.stopPropagation();
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    onDeleteUser(userId); // Call the provided onDeleteUser function
  };

  const renderUsers = () => {
    if (isLoading) {
      return (
        <div className="loading-spinner"></div>
      );
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return filteredUsers.map((user) => (
      <li key={user.id} onClick={() => onSelectUser(user)}>
        <span>{user.first_name} {user.last_name}</span>
        <button className={styles.deleteButton} onClick={(e) => handleDeleteUser(user.id, e)}>Delete</button>
      </li>
    ));
  };

  return (
    <div className={styles.userList}>
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.formGroup}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button
          className={styles.addButton}
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      <ul>
        {renderUsers()}
      </ul>
    </div>
  );
};

export default UserList;
