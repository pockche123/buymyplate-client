import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginWithKeycloak } from '../api/authApi';
import { getUserInfo } from '../api/userApi';
import { Navigate } from 'react-router-dom';


const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  

    const checkSavedSession = useCallback(async () => {
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
  
        if (savedUser && accessToken) {
          setUser(JSON.parse(savedUser));
        } else {
          clearSession();
        }
      } catch (error) {
        console.error('Session check failed:', error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    const clearSession = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    };

      const login = async (username,password) => {
        try {
          console.log("inside login")
          
          const keycloakResponse= await loginWithKeycloak(username,password)

              
          if (!keycloakResponse?.access_token) {
            throw new Error('No access token received');
        }

          console.log("key: ", keycloakResponse)
        
          // const data = await response.json();
          
          localStorage.setItem("accessToken", keycloakResponse.access_token);
          localStorage.setItem("refreshToken", keycloakResponse.refresh_token);
          localStorage.setItem("tokenExpiry", Date.now() + keycloakResponse.expires_in * 1000);
          
          const userInfo = await getUserInfo();

          console.log("this is user info: ", userInfo)

          if(!userInfo){
            throw new Error("User not found")
          }


          const userData = {
            userId: userInfo.data.userId,
            username: userInfo.data.username,
            role: userInfo.data.role,

          }
        
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          return { success: true };
        } catch (error) {
          console.log("Login error: ", error)
          return { success: false, error: error.message };
        }
      };

      const logout = () => {
        clearSession();
    
      };
    
      // Check session on mount and clean up on unmount
      useEffect(() => {
        checkSavedSession();
        const interval = setInterval(checkSavedSession, 15 * 60 * 1000); // Check every 15 mins
        
        return () => clearInterval(interval);
      }, [checkSavedSession]);

      
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