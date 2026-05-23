import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser({
        token,
        ...JSON.parse(userData),
      });
    }
  }, []);

  // LOGIN
  const login = (data) => {
    localStorage.setItem("token", data.token);

    // simpan user object
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser({
      token: data.token,
      ...data.user,
    });
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
