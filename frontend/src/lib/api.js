const API_BASE = "http://localhost:8000/api";

export async function login({ username, password }) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Login failed");
  }
  const data = await res.json();
  // Store tokens
  if (data.access && data.refresh) {
    const { setTokens } = require('./auth');
    setTokens(data.access, data.refresh);
  }

  return data;
}

export async function signup({ username, email, password }) {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }
  return await res.json();
}

export async function logout() {
  const { getTokens, removeTokens } = require('./auth');
  const tokens = getTokens();
  try {
    const res = await fetch(`${API_BASE}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens?.access}`,
      },
      body: JSON.stringify({
        refresh: tokens?.refresh
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Logout failed");
    }
  } finally {
    // Always remove tokens, even if the API call fails
    removeTokens();
  }
}

export async function generateBlog(title) {
  const { getTokens } = require('./auth');
  const tokens = getTokens();
  
  const res = await fetch(`${API_BASE}/articles/generate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokens.access}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to generate blog");
  }

  return await res.json();
}

export async function fetchAllArticles() {
  const { getTokens } = require('./auth');
  const tokens = getTokens();
  
  const res = await fetch(`${API_BASE}/articles/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${tokens?.access}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to fetch articles");
  }

  return await res.json();
}


