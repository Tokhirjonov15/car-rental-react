export const getStoredUser = (): any | null => {
  if (typeof window === "undefined") return null;

  const rawUserData = localStorage.getItem("userData");
  const rawUser = localStorage.getItem("user");

  try {
    if (rawUserData) return JSON.parse(rawUserData);
    if (rawUser) return JSON.parse(rawUser);
  } catch (err) {
    return null;
  }

  return null;
};

export const getAuthToken = (): string | null => {
  const stored = getStoredUser();
  if (!stored) return null;

  const candidateKeys = [
    "token",
    "accessToken",
    "jwt",
    "authToken",
    "userToken",
  ] as const;

  for (const key of candidateKeys) {
    const value = stored?.[key];
<<<<<<< HEAD
    if (typeof value === "string" && value.trim() !== "") return value;
=======
    if (typeof value === "string" && value.trim() !== "") {
      const token = value.trim();
      return token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;
    }
>>>>>>> master
  }

  if (typeof stored?.user === "object" && stored.user) {
    for (const key of candidateKeys) {
      const value = stored.user?.[key];
<<<<<<< HEAD
      if (typeof value === "string" && value.trim() !== "") return value;
=======
      if (typeof value === "string" && value.trim() !== "") {
        const token = value.trim();
        return token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;
      }
>>>>>>> master
    }
  }

  return null;
};

export const isUserLoggedIn = (): boolean => {
  return !!getStoredUser();
};
