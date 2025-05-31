import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const API_URL = import.meta.env.VITE_API_URL

interface AuthContextType {
  user: any;
  isLoading: boolean;
  isLogged: boolean;
  login: (cpf: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedLogged = localStorage.getItem("isLogged");
      setUser(storedUser == null ? null : JSON.parse(storedUser));
      setisLogged(storedLogged == 'true') // isso está horroroso 
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (cpf: string, senha: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, senha }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log(data);

      setUser(data.user);
      setisLogged(true);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLogged", 'true');
      
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    setisLogged(false);
    localStorage.removeItem("user");
    localStorage.setItem("isLogged", 'false');
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isLogged, login, logout }}>
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