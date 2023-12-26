import React, { useEffect, useState } from 'react';
import styles from '../styles/UserList.module.css';

const UserList = ({ onSelectUser, onAddUser, onDeleteUser }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.data);
        setFilteredUsers(data.data); // Initialize filtered users with all users
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter users when the search term changes
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user => {
      return `${user.first_name} ${user.last_name}`.toLowerCase().includes(lowercasedSearchTerm) || 
             user.email.toLowerCase().includes(lowercasedSearchTerm);
    });
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      first_name: newUserName.split(' ')[0],
      last_name: newUserName.split(' ')[1] || '',
      email: newUserEmail,
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
    };

    const newUsersList = [...users, newUser];
    setUsers(newUsersList);
    setFilteredUsers(newUsersList); // Update filtered users
    onAddUser(newUser);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = (userId, event) => {
    event.stopPropagation();
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Update filtered users
    onDeleteUser(userId);
  };

  return (
    <div className={styles.userList}>
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput} // Make sure to define this class in your CSS
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
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            <span className={styles.userName}>
              {user.first_name} {user.last_name}
            </span>
            <button
              className={styles.deleteButton}
              onClick={(e) => handleDeleteUser(user.id, e)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
