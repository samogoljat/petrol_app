// userService.js
const BASE_URL = 'https://reqres.in/api';

const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

// You can add more functions here for adding, updating, or deleting users

export { fetchUsers };
