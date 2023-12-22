import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user

  // Function to handle adding a new user (to be passed to UserList)
  const handleAddUser = (newUser) => {
    console.log('User added:', newUser);
  };

  // Function to handle deleting a user (to be passed to UserList)
  const handleDeleteUser = (userId) => {
    console.log('User deleted with ID:', userId);
  };

  return (
    <div style={{ display: 'flex' }}>
      <UserList
        onSelectUser={setSelectedUser}
        onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUser}
      />
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
