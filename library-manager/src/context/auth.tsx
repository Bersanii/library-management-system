import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
  user: string | null | undefined;
  isLoading: boolean;
  login: (userData: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: string) => {
    setUser(userData);
    localStorage.setItem("user", userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};