# expo-ocr-example

This example originally used `react-native-tesseract-ocr`, but that module is out of date and seems to have been abandoned. It now uses a local Expo Module that wraps ML Kit Vision Text recognition on Android, and the Vision framework on iOS.

The Expo Module includes native code, so you will need to build with EAS Build. This also means that it will NOT work with the Expo Go app.

Instead of using the Expo Go app for development you can build a Custom Development Client, which is basically like a custom version of Expo Go that includes only your dependencies.

## Build

See the EAS Build documentation for more possibilities.

### Custom Development Client

```
eas build --platform android --profile development
eas build --platform ios --profile development
```

### Standalone app

```
eas build --platform android --profile production
eas build --platform ios --profile production
```

### Build and run the iOS version of the app locally in a Simulator

This is useful if you have a Mac with an up to date version of Xcode, but you do not yet have an Apple developer account.

```
npx expo run:ios
```
