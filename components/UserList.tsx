import React, { useState, useEffect } from 'react';
import useUsers from './useUsers'; // Assuming this will also be a TypeScript file
import styles from '../styles/UserList.module.css';
import '../styles/loadingSpinnerStyles.css';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserListProps {
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser }) => {
  const { users, isLoading, error, addUser, deleteUser } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(lowercasedSearchTerm) ||
      user.email.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleAddUser = (): void => {
    const newUser: User = {
      id: Date.now(),
      first_name: newUserName.split(' ')[0],
      last_name: newUserName.split(' ')[1] || '',
      email: newUserEmail,
      avatar: 'https://reqres.in/img/faces/10-image.jpg',
    };
    addUser(newUser);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = (userId: number, event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    deleteUser(userId);
  };

  const renderUsers = (): JSX.Element => {
    if (isLoading) {
      return <div className="loading-spinner"></div>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            <span>{user.first_name} {user.last_name}</span>
            <button className={styles.deleteButton} onClick={(e) => handleDeleteUser(user.id, e)}>Delete</button>
          </li>
        ))}
      </ul>
    );
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
