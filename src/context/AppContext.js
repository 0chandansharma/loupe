import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({
    defaultLanguage: 'english', // 'english' or 'hindi'
    saveToGallery: false,
    darkMode: false,
  });
  
  // Load settings from storage on app start
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('settings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
        
        const storedHistory = await AsyncStorage.getItem('history');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings when they change
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('settings', JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    };
    
    if (!isLoading) {
      saveSettings();
    }
  }, [settings, isLoading]);
  
  // Save history when it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('history', JSON.stringify(history));
      } catch (error) {
        console.error('Error saving history:', error);
      }
    };
    
    if (!isLoading && history.length > 0) {
      saveHistory();
    }
  }, [history, isLoading]);
  
  // Add a new summary to history
  const addToHistory = (summary) => {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      summary,
    };
    
    setHistory(prevHistory => [newEntry, ...prevHistory]);
  };
  
  // Update settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };
  
  const contextValue = {
    isLoading,
    history,
    settings,
    addToHistory,
    updateSettings,
    clearHistory,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

export default AppContext;