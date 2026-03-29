import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, company = "") => {
    const name = email.split("@")[0];
    const initials = name
      .split(/[._-]/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("") || name.slice(0, 2).toUpperCase();
    setUser({ email, name, company, initials });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}