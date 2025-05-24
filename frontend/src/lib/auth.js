const TOKEN_KEY = 'auth_tokens';

export function setTokens(access, refresh) {
  // Store in localStorage for client-side access
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ access, refresh }));
  
  // Store in cookies for middleware access (will be sent with every request)
  document.cookie = `${TOKEN_KEY}=${JSON.stringify({ access, refresh })}; path=/; max-age=604800; SameSite=Lax`;
}

export function getTokens() {
  const tokens = localStorage.getItem(TOKEN_KEY);
  return tokens ? JSON.parse(tokens) : null;
}

export function removeTokens() {
  // Remove from localStorage
  localStorage.removeItem(TOKEN_KEY);
  
  // Remove from cookies
  document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
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
