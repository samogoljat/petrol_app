import React, { useEffect, useState } from 'react';
import styles from '../styles/UserList.module.css';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.userList}>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
