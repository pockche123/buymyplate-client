import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkSavedSession();
      }, []);
    
    const checkSavedSession = async () => {
        try {
          // Check localStorage or make API call to verify session
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } catch (error) {
          console.error('Session check failed:', error);
        } finally {
          setIsLoading(false);
        }
      };

      const login = async (credentials) => {
        try {
          // Replace with actual API call
          const mockUser = {
            // id: 1,
            // username: "user123",
            // role: 'CUSTOMER',
            // token: 'mock-jwt-token'
          };
    
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          return { success: true };
        } catch (error) {
          return { success: false, error: error.message };
        }
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
      };

      console.log("user in auth: ", user)

      const value = {
        user,
        setUser,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null
      };

      return (
        <AuthContext.Provider value={value}>
          {!isLoading && children}
        </AuthContext.Provider>
      );


}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }