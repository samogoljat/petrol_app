import React, { useEffect, useState } from 'react';
import styles from '../styles/UserList.module.css';

const UserList = ({ onSelectUser, onAddUser, onDeleteUser }) => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      first_name: newUserName.split(' ')[0],
      last_name: newUserName.split(' ')[1] || '',
      email: newUserEmail,
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
    };

    setUsers([...users, newUser]);
    onAddUser(newUser);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = (userId, event) => {
    event.stopPropagation();
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    onDeleteUser(userId);
  };

  return (
    <div className={styles.userList}>
      <h2>User List</h2>
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
        {users.map(user => (
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
