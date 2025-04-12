import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { apiService } from '../services/apiService';
import { shareService } from '../services/shareService';

export const useSummary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const { addToHistory } = useAppContext();
  
  // Generate summary from image
  const generateSummary = async (imageUri) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call API to generate summary
      // In a real app, use this:
      // const result = await apiService.generateSummary(imageUri);
      
      // For demo, use mock data
      const result = apiService.getMockSummary();
      
      setSummary(result);
      
      // Add to history
      addToHistory(result);
      
      return result;
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error.message || 'Failed to generate summary');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Share summary
  const shareSummary = async (content, method) => {
    try {
      switch (method) {
        case 'whatsapp':
          await shareService.shareToWhatsApp(content);
          break;
        case 'email':
          await shareService.shareViaEmail(content, 'Medical Report Summary');
          break;
        case 'pdf':
          await shareService.generateAndSharePDF(content, 'Medical_Summary');
          break;
        case 'copy':
          await shareService.copyToClipboard(content);
          break;
        default:
          await shareService.shareGeneric(content, 'Medical Report Summary');
      }
      return true;
    } catch (error) {
      console.error('Error sharing summary:', error);
      setError(error.message || 'Failed to share summary');
      return false;
    }
  };
  
  return {
    loading,
    error,
    summary,
    generateSummary,
    shareSummary,
  };
};