export const getStoredUser = (): any | null => {
  if (typeof window === "undefined") return null;

  const rawUserData = localStorage.getItem("userData");
  const rawUser = localStorage.getItem("user");

  try {
    if (rawUserData) return JSON.parse(rawUserData);
    if (rawUser) return JSON.parse(rawUser);
  } catch {
    return null;
  }

  return null;
};

export const clearStoredAuth = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("userData");
  localStorage.removeItem("user");
};

const normalizeToken = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const token = value.trim();
  if (!token) return null;
  return token.startsWith("Bearer ") ? token.slice(7).trim() : token;
};

export const getAuthToken = (): string | null => {
  const stored = getStoredUser();
  if (!stored) return null;

  const candidateKeys = ["token", "accessToken", "jwt", "authToken", "userToken"] as const;

  for (const key of candidateKeys) {
    const token = normalizeToken(stored?.[key]);
    if (token) return token;
  }

  if (typeof stored?.user === "object" && stored.user) {
    for (const key of candidateKeys) {
      const token = normalizeToken(stored.user?.[key]);
      if (token) return token;
    }
  }

  return null;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const tokenParts = token.split(".");
    if (tokenParts.length < 2) return true;

    const base64 = tokenParts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(window.atob(base64));
    const exp = typeof payload?.exp === "number" ? payload.exp : null;
    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
};

export const getAuthenticatedUser = (): any | null => {
  const user = getStoredUser();
  if (!user) return null;

  const token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    clearStoredAuth();
    return null;
  }

  return user;
};

export const isUserLoggedIn = (): boolean => {
  return !!getAuthenticatedUser();
};
