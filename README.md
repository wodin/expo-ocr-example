# expo-ocr-example

This example uses `react-native-tesseract-ocr` which uses native code. Because of this you will need to build with EAS Build.
This also means that it will NOT work with Expo Go.

Instead of the Expo Go app you can build a Custom Development Client, which is basically like a custom version of Expo Go that includes only your dependencies.

Note: `react-native-tesseract-ocr` seems to have been abandoned. Also, it seems not to be very reliable. You might need to click on the button several times to get it to recognise most of the text.

It would be better to create a new module based on Google ML Kit Vision Text recognition.

## Patches

I needed to patch react-native-tesseract-ocr to use the cache dir for its `DATA_PATH`. I also needed to update its `build.gradle` to build with React Native 0.76.

## Build

See the EAS Build documentation for more possibilities.

### Custom Development Client

```
eas build --platform android --profile development
```

### Standalone app

```
eas build --platform android --profile production
```
