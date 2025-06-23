export const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (response.status === 401) {
    try {
      const refreshRes = await fetch('http://localhost:5000/api/v1/users/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        // Retry original request after refreshing token
        return await fetch(url, {
          ...options,
          credentials: 'include',
        });
      } else {
        console.warn("Refresh token failed");
        throw new Error("Unauthorized - refresh failed");
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  }

  return response;
};
