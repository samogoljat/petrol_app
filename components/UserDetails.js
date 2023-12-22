import React from 'react';
import styles from '../styles/UserDetails.module.css';

const UserDetails = ({ user }) => {
  // Component to display the details of the selected user
  return (
    <div className={styles.userDetails}>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={{ maxWidth: '100px' }} />
    </div>
  );
};

export default UserDetails;
