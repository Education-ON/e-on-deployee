// src/contexts/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import api from "../api/api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username: "jungho", ... }

  const login = (userData) => {
    setUser(userData); // 로그인 시 유저 데이터 저장
  };

  const logout = () => {
    setUser(null);
  };

  const signup = data => api.post('/auth/join/step3', data);

  const isLoggedIn = !!user;
  
  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
