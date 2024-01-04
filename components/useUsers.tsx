import { useState, useEffect } from 'react';
import { fetchUsers } from './userService'; // Assuming this will also be converted to TypeScript

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsers: User[] = await fetchUsers();
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

  const addUser = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const deleteUser = (userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  return { users, isLoading, error, addUser, deleteUser };
};

export default useUsers;
