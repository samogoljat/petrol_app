import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ display: 'flex' }}>
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser && <UserDetails user={selectedUser} />}
    </div>
  );
}
