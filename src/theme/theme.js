// Theme configuration for Bricklogic app

export const theme = {
  colors: {
    // Primary colors
    background: '#000000',  // Deep black background
    text: '#FFFFFF',        // White text for readability
    accent: '#FFD700',      // Warm gold accent color
    accentDark: '#D4AF37',  // Darker gold for hover/pressed states
    
    // UI element colors
    inputBackground: '#1A1A1A',  // Slightly lighter than background for inputs
    inputText: '#CCCCCC',        // Light gray for input text
    inputPlaceholder: '#666666', // Medium gray for placeholders
    
    // Status colors
    success: '#4CAF50',  // Green for success states
    error: '#F44336',    // Red for error states
    warning: '#FFC107',  // Amber for warning states
    info: '#2196F3',     // Blue for info states
    
    // Progress indicators
    progressTrack: '#333333',  // Dark gray for progress tracks
    progressFill: '#FFD700',   // Gold for progress fill
  },
  
  typography: {
    fontFamily: {
      regular: 'System',  // Default system font
      medium: 'System',   // Medium weight
      bold: 'System',     // Bold weight
    },
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
      xlarge: 24,
      xxlarge: 32,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    pill: 9999,
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 8,
    },
  },
};