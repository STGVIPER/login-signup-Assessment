const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888';

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/pages/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function registerUser(name, email, password) {
  const res = await fetch(`${BASE_URL}/pages/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function getDashboard(token) {
  const res = await fetch(`${BASE_URL}/pages/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
