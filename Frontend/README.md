# Lockin

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2. Prebuild app
   ```bash
   npx expo prebuild --clean
   ```

3. Start the app

   ```bash
    npx expo run:ios # ios
   ```
   ```bash
    npx expo run:android # android
   ```
> Firebase does not work with Expo Go, so we need to prebuild and run locally (or using eas). This means that you need [Android Studio](https://developer.android.com/studio) to develop build android and MacOS to build for iOS unless you use [eas](https://expo.dev/eas).

> If you are trying to test phone authentication, you need to use a test number. Test numbers are available in the firebase console > authentication > sign in method > phone > Phone numbers for testing
