const TOKEN_KEY = 'auth_tokens';

export function setTokens(access, refresh) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ access, refresh }));
}

export function getTokens() {
  const tokens = localStorage.getItem(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
}

export function removeTokens() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  const tokens = getTokens();
  return !!tokens?.access;
}

export async function refreshAccessToken() {
  const tokens = getTokens();
  if (!tokens?.refresh) return null;

  try {
    const response = await fetch('http://localhost:8000/api/auth/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });

    if (!response.ok) {
      removeTokens();
      return null;
    }

    const data = await response.json();
    setTokens(data.access, tokens.refresh);
    return data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    removeTokens();
    return null;
  }
}
