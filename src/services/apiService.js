import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://your-api-endpoint.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  }
});

export const apiService = {
  /**
   * Send image to API and get summary in English and Hindi
   * @param {string} imageUri - The URI of the captured image
   * @returns {Promise<Object>} - The summary data
   */
  generateSummary: async (imageUri) => {
    try {
      // Create form data
      const formData = new FormData();
      
      // Append image file
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'document.jpg',
      });
      
      // Make API request
      const response = await api.post('/generate-summary', formData);
      
      // Return the data in the expected format
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle specific error cases
      if (error.response) {
        // The request was made and the server responded with an error status
        throw new Error(`Server error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Network error. Please check your connection.');
      } else {
        // Something happened in setting up the request
        throw new Error('An unexpected error occurred.');
      }
    }
  },
  
  // Mock function for development/testing
  getMockSummary: () => {
    return {
      "English Summary": "The mammography report indicates an abnormality in the left breast. A round, high-density mass with microlobulated margins is observed in the upper outer quadrant, measuring 5.5 x 5 cm. Few coarse and fine pleomorphic calcifications are noted within the mass. No microcalcifications are seen. The lymph nodes (axillary) appear normal. The findings are categorized as BIRADS 5, suggesting a high likelihood of malignancy. Biopsy and further evaluation and consultation with a specialist are recommended to confirm the diagnosis and decide on the next steps.",
      "Hindi Summary": "मेमोग्राफी रिपोर्ट में बाईं स्तन में असामान्यता पाई गई है। ऊपरी बाहरी हिस्से में 5.5 x 5 सेमी का गोल, उच्च घनत्व वाला मास पाया गया है, जिसमें सूक्ष्म लोबुलेटेड किनारे हैं। मास के भीतर कुछ मोटे और महीन प्लियोमॉर्फिक कैल्सिफिकेशन देखे गए हैं। कोई सूक्ष्म कैल्सिफिकेशन नहीं देखा गया। लसीका ग्रंथि (एक्सिलरी) सामान्य दिख रही हैं। यह निष्कर्ष BIRADS श्रेणी 5 में आता है, जो कैंसर की उच्च संभावना को दर्शाता है। निदान की पुष्टि और अगले कदम तय करने के लिए बायोप्सी और विशेषज्ञ से परामर्श की सिफारिश की जाती है।"
    };
  }
};