// useUsers.js
import { useState, useEffect } from 'react';
import { fetchUsers } from './userService'; // Importing the service function

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  return { users, isLoading, error };
};

export default useUsers;
