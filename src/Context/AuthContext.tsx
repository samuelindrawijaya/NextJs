// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => void;
  fetchWithBearerToken: (url: string, token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.access_token);
      setIsAuthenticated(true);
      router.push("/profile"); 
    } catch (error) {
      Swal.fire("ERROR!", "Login failed", "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    router.push("/login"); 
  };

  const fetchWithBearerToken = async (url: string, token: string): Promise<void> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      localStorage.setItem("imgUser", data.avatar);
    } catch (error) {
      Swal.fire("ERROR!", "Something bad happened", "error");
    }
  };

  const register = (email: string, password: string): void => {
    localStorage.setItem("authToken", "fake-auth-token"); 
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, fetchWithBearerToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
