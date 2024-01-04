import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';
import '../styles/globals.css';

// Assuming this is the structure of your user object
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to track the selected user

  // Function to handle adding a new user (to be passed to UserList)
  const handleAddUser = (newUser: User) => {
    console.log('User added:', newUser);
  };

  // Function to handle deleting a user (to be passed to UserList)
  const handleDeleteUser = (userId: number) => {
    console.log('User deleted with ID:', userId);
  };

  return (
    <div className="container">
      <UserList
        onSelectUser={setSelectedUser}
        onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUser}
      />
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
