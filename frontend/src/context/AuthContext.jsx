import { createContext, useContext, useMemo, useState } from "react";
import { loginUser } from "../services/users.services";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(getStoredUser);

  const login = async (formData) => {
    const response = await loginUser(formData);
    const { token: newToken, user: newUser } = response.data;

    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateStoredUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem("user", JSON.stringify(nextUser));
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      updateStoredUser,
      isAuthenticated: Boolean(token),
      userId: user?.id ?? user?._id,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
};
