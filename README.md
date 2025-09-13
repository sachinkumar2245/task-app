# React Native Practical Task Application
This project is a collection of React Native practical tasks covering lists, navigation, offline support, secure storage, deep linking, and performance optimizations.
Each task builds on the previous one to demonstrate common app development scenarios.

## Tech Stack
- React Native
- TypeScript
- React Navigation v7 (stack and tab navigators)
- Zustand for state management
- AsyncStorage + NetInfo for offline support
- react-native-keychain → secure token storage
- PNG assets → tab icons

## Navigation Structure
- Bottom Tab Navigator
    - Home Tab
        - Large List Screen
        - Shop(Products + Cart)
        - User Screen
        - Toke
- Using Custom PNG icons for tabs

## How to Run
```bash
# Install dependencies
npm install

# Install pods for iOS
cd ios && pod install && cd ..

# Android
npm run android

# iOS
npm run ios
```

## Testing Deep Linking
``` bash
# Android
adb shell am start -W -a android.intent.action.VIEW -d "myapp://user/1" com.taskApp

# iOS (using simulator)
xcrun simctl openurl booted "myapp://user/1"
```

## Notes
- Focused on clean code, modular components, and best practices.
- Each task is modular and easy to follow.
- 
