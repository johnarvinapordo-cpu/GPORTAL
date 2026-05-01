const API_BASE = "";

export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the backend API. Start it with npm run server, then try again.");
  }

  const text = await response.text();
  const data = text ? tryParseJson(text) : {};
  if (!response.ok) {
    throw new Error(data.error || data.message || `Backend request failed (${response.status}).`);
  }

  return data;
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("cmdi_user") || "null");
  } catch {
    return null;
  }
}

export function storeSession({ token, user }) {
  localStorage.setItem("cmdi_token", token);
  localStorage.setItem("cmdi_user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("cmdi_token");
  localStorage.removeItem("cmdi_user");
}
