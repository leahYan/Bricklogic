# Android Studio Setup Guide for Bricklogic

This guide will help you set up and run the Bricklogic property investment app using Android Studio.

## Prerequisites

- [Android Studio](https://developer.android.com/studio) (latest version)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or newer

## Setup Steps

### 1. Configure Android Studio

1. Open Android Studio
2. Make sure you have the following components installed (via Tools > SDK Manager):
   - Android SDK Platform (API level 33 or higher recommended)
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

### 2. Configure Environment Variables

Make sure the following environment variables are set:

- `ANDROID_HOME`: Path to your Android SDK
- `JAVA_HOME`: Path to your JDK installation

Add the following to your PATH:

- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\emulator`

### 3. Create an Android Virtual Device (AVD)

1. In Android Studio, go to Tools > AVD Manager
2. Click "Create Virtual Device"
3. Select a device (e.g., Pixel 6)
4. Select a system image (API level 33 or higher recommended)
5. Complete the AVD creation process

### 4. Prepare the Bricklogic Project

1. Open a terminal in the project directory
2. Install dependencies:
   ```
   npm install
   ```

### 5. Run the Project on Android

#### Option 1: Using Expo

1. Start the Expo development server:
   ```
   npm start
   ```
2. Press 'a' to run on Android
3. Ensure your emulator is running or a physical device is connected

#### Option 2: Using Android Studio (Ejected Expo Project)

If you need to eject the Expo project to access native code:

1. Eject the Expo project:
   ```
   npx expo eject
   ```
2. This will create the `android` directory with all necessary files
3. Open Android Studio
4. Select "Open an existing project"
5. Navigate to the `android` folder in your project directory and open it
6. Wait for Gradle sync to complete
7. Click the Run button (green triangle) to build and run the app on your emulator or connected device

### 6. Troubleshooting

#### Common Issues

1. **Gradle Build Failures**

   - Make sure you have the correct JDK version
   - Try running `./gradlew clean` in the android directory

2. **Missing Android SDK Components**

   - Open SDK Manager in Android Studio and install any missing components

3. **Device Connection Issues**

   - For physical devices, ensure USB debugging is enabled
   - For emulators, make sure they are started before running the app

4. **Metro Bundler Issues**
   - Try clearing the Metro cache: `npx react-native start --reset-cache`

### 7. Development Workflow

1. Make changes to your React Native code
2. If using Expo, changes will automatically reload
3. If using ejected project in Android Studio, you may need to rebuild the app

### 8. Building an APK for Testing

1. In Android Studio, select Build > Build Bundle(s) / APK(s) > Build APK(s)
2. The APK will be generated in `android/app/build/outputs/apk/debug/`

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/environment-setup)
- [Expo Documentation](https://docs.expo.dev/)
- [Android Studio Documentation](https://developer.android.com/studio/intro)
