# Conversion Plan: React Native to Next.js with TypeScript and TailwindCSS

## Overview

This document outlines the plan to convert the Bricklogic React Native Expo app to a Next.js application with TypeScript and TailwindCSS, using Capacitor for mobile deployment.

## Current Architecture

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack Navigator)
- **Styling**: React Native StyleSheet
- **Backend**: Supabase
- **Theme**: Custom dark theme with gold accents

## Target Architecture

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: TailwindCSS
- **Mobile**: Capacitor
- **Navigation**: Next.js App Router
- **Backend**: Continue using Supabase

## Conversion Steps

### 1. Project Setup

1. Create a new Next.js project with TypeScript and TailwindCSS
2. Install and configure Capacitor
3. Set up project structure following Next.js conventions

### 2. Theme Migration

1. Convert the existing theme to TailwindCSS configuration
2. Create a dark theme with gold accents matching the current design

### 3. Component Migration

1. Convert React Native components to web components with TailwindCSS
2. Recreate custom components like BudgetSlider using web-compatible libraries
3. Replace React Native specific components with web equivalents:
   - `SafeAreaView` → `div` with appropriate padding
   - `TouchableOpacity` → `button` or `a` tags
   - `FlatList` → standard mapping over arrays with `div` containers

### 4. Navigation Migration

1. Convert React Navigation stack to Next.js App Router
2. Implement equivalent page transitions and animations
3. Set up proper routing for all screens

### 5. Service Migration

1. Update Supabase integration to work with Next.js
2. Adapt AsyncStorage usage to use localStorage or cookies

### 6. Mobile Adaptation with Capacitor

1. Configure Capacitor for iOS and Android
2. Implement mobile-specific UI adjustments
3. Handle platform-specific features

### 7. TypeScript Implementation

1. Create TypeScript interfaces for all data models
2. Add type definitions for components, props, and state
3. Implement strict type checking

## Key Challenges

1. **UI Component Translation**: Converting React Native components to web equivalents while maintaining the same look and feel
2. **Gesture Handling**: Recreating touch gestures like those used in BudgetSlider
3. **Navigation Experience**: Ensuring the navigation experience remains smooth and intuitive
4. **Mobile Adaptation**: Making sure the web app works well on mobile through Capacitor

## Implementation Order

1. Project setup and configuration
2. Theme and styling conversion
3. Basic page structure and navigation
4. Core components migration
5. Service layer adaptation
6. TypeScript implementation
7. Mobile adaptation with Capacitor
8. Testing and refinement

## Required Dependencies

- Next.js
- TypeScript
- TailwindCSS
- @capacitor/core and related plugins
- @supabase/supabase-js
- React-based slider component (replacement for custom BudgetSlider)
- Icon library (replacement for Expo vector icons)
