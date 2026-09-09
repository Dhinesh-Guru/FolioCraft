import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = 'foliocraft_user';
const STORAGE_KEY_USERS_DB = 'foliocraft_users_db';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [hasChosenSession, setHasChosenSession] = useState(() => {
    try {
      return localStorage.getItem('foliocraft_session_chosen') === 'true';
    } catch {
      return false;
    }
  });

  const [isGuest, setIsGuest] = useState(() => {
    return !user;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem('foliocraft_session_chosen', 'true');
      setIsGuest(false);
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  const markSessionChosen = () => {
    localStorage.setItem('foliocraft_session_chosen', 'true');
    setHasChosenSession(true);
  };

  // Sign up with duplicate email check
  const signup = (name, email, password) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB) || '[]');
    const emailTrimmed = email.trim().toLowerCase();
    
    const isDuplicate = existing.some(u => u.email.toLowerCase() === emailTrimmed);
    if (isDuplicate) {
      return { 
        success: false, 
        message: 'An account with this email address already exists. Please log in instead.' 
      };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: emailTrimmed,
      createdAt: new Date().toISOString()
    };
    
    // Save to users DB
    existing.push({ ...newUser, password });
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(existing));

    setUser(newUser);
    markSessionChosen();
    setIsGuest(false);
    return { success: true };
  };

  // Login with strict user check and password verification
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB) || '[]');
    const emailTrimmed = email.trim().toLowerCase();
    const foundUser = users.find(u => u.email.toLowerCase() === emailTrimmed);
    
    if (!foundUser || foundUser.password !== password) {
      return { 
        success: false, 
        message: 'Incorrect username/ password' 
      };
    }

    const { password: _password, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    markSessionChosen();
    setIsGuest(false);
    return { success: true };
  };

  // Password reset link generator
  const resetPassword = (email) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB) || '[]');
    const emailTrimmed = email.trim().toLowerCase();
    const foundUser = users.find(u => u.email.toLowerCase() === emailTrimmed);

    const token = `fc_reset_${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
    const baseUrl = window.location.origin + window.location.pathname;
    const resetUrl = `${baseUrl}?resetToken=${token}&email=${encodeURIComponent(emailTrimmed)}`;

    return {
      success: true,
      exists: !!foundUser,
      message: foundUser
        ? `Password reset link generated for ${emailTrimmed}!`
        : `Email ${emailTrimmed} not found in database, but demo reset link generated below:`,
      resetUrl
    };
  };

  // Update password and log in user
  const updateUserPassword = (email, newPassword) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB) || '[]');
    const emailTrimmed = email.trim().toLowerCase();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === emailTrimmed);

    let updatedUser;
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
      const { password: _p, ...clean } = users[userIndex];
      updatedUser = clean;
    } else {
      updatedUser = {
        id: 'usr_' + Date.now(),
        name: emailTrimmed.split('@')[0],
        email: emailTrimmed,
        createdAt: new Date().toISOString()
      };
      users.push({ ...updatedUser, password: newPassword });
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
    }

    setUser(updatedUser);
    markSessionChosen();
    setIsGuest(false);
    return { success: true };
  };

  // Single Sign On simulation (Google / GitHub)
  const loginWithProvider = (provider, email, name) => {
    const providerUser = {
      id: `usr_${provider}_` + Date.now(),
      name: name || (provider === 'google' ? 'Google User' : 'GitHub User'),
      email: email || `user.${provider}@example.com`,
      provider,
      createdAt: new Date().toISOString()
    };
    setUser(providerUser);
    markSessionChosen();
    setIsGuest(false);
    return { success: true };
  };

  // Continue as Guest
  const startGuestSession = () => {
    setUser(null);
    markSessionChosen();
    setIsGuest(true);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  // Update profile
  const updateProfile = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
  };

  // Delete account
  const deleteAccount = () => {
    setUser(null);
    setIsGuest(true);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isGuest,
      hasChosenSession,
      signup,
      login,
      resetPassword,
      updateUserPassword,
      loginWithProvider,
      startGuestSession,
      logout,
      updateProfile,
      deleteAccount
    }}>
      {children}
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
