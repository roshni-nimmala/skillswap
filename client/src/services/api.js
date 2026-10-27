
const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser(userData) {
  const response = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}
export async function loginUser(credentials){
  const response=await fetch(
     `${API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  );
   const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function getUsers(token, skill = '') {
  const query = skill
    ? `?skill=${encodeURIComponent(skill)}`
    : '';

  const response = await fetch(
    `${API_URL}/api/users${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not load users');
  }

  return data;
}

export async function getSkillMatches(token) {
  const response = await fetch(
    `${API_URL}/api/users/matches`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not load skill matches');
  }

  return data;
}

export async function getMyProfile(token) {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not load profile');
  }

  return data;
}

export async function updateMyProfile(token, updates) {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not update profile');
  }

  return data;
}
