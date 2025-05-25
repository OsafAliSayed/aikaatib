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

  // get user info
  const userRes = await fetch(`${API_BASE}/user/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${data.access}`,
    }
  }).then(response => response.json())
  .then(data => {
    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(data));
  });
  // store user info in localStorage


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

export async function fetchArticleById(id) {
  const { getTokens } = require('./auth');
  const tokens = getTokens();

  const res = await fetch(`${API_BASE}/articles/${id}/`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${tokens?.access}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to fetch article");
  }

  return await res.json();
}

export async function fetchArticleContent(contentUrl) {
  if (!contentUrl) {
    throw new Error("Content URL is required");
  }

  const res = await fetch(contentUrl);

  if (!res.ok) {
    throw new Error("Failed to fetch article content");
  }

  return await res.text();
}

export async function saveArticleContent(id, title, content) {
  const { getTokens } = require('./auth');
  const tokens = getTokens();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user id", user.id)
  const res = await fetch(`${API_BASE}/articles/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokens?.access}`,
    },
    body: JSON.stringify({
      "user": user?.id, // Fallback to null if user ID is not available
      "title": title,
      "content": content,
      "keywords": ""
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to save article content");
  }

  return await res.json();
}


