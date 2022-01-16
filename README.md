# expo-ocr-example

This example uses `react-native-tesseract-ocr` which uses native code. Because of this you will need to build with EAS Build.
This also means that it will NOT work with Expo Go.

Instead of the Expo Go app you can build a Custom Development Client, which is basically like a custom version of Expo Go that includes only your dependencies.

## Patches

I needed to patch react-native-tesseract-ocr to use the cache dir for its `DATA_PATH`.

Also, there's currently an issue with jcenter.bintray.com, so I had to remove all references to `jcenter()` from the `build.gradle` files in the dependencies and also in the `build.gradle` for this app. The latter needed to be done using a Config Plugin.

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
