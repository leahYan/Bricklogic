# Bricklogic - Property Investment App MVP

A mobile application that guides users through property investment decisions with an AI-driven workflow, helping them explore strategies, find relevant locations, and connect with vetted mortgage brokers.

## Project Overview

This MVP focuses on validating user engagement with AI-driven strategy exploration, simplified location matching, and measuring user willingness to connect with mortgage brokers through the app.

## Core Features

- **AI Strategy Insights**: Presents predefined property strategy archetypes with static descriptions
- **Location Analysis**: Searches for suburbs based on state, budget range, and selected priority
- **Broker Connection**: Contextual prompt to connect with a vetted mortgage broker
- **Basic Onboarding**: Simple user profile setup with goal category, budget range, and state

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native environment setup

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Project Structure

```
src/
├── assets/         # Images, fonts, etc.
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── screens/        # App screens
├── services/       # API services and data handling
├── store/          # State management
└── utils/          # Utility functions
```

## Development Notes

- This is an MVP focused on validating core concepts
- No financial advice is provided through the app
- Uses simplified/static data for demonstration purposes
- Mobile-first design (portrait orientation only)
