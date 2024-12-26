import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import MlKitOcr from "./modules/ml-kit-ocr";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const imgSrc = require("./assets/sample.png");
  const [imgUri, setImgUri] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    Asset.fromModule(imgSrc)
      .downloadAsync()
      .then(async ({ localUri }) => {
        const cachePath = FileSystem.cacheDirectory + "sample.png";
        await FileSystem.copyAsync({ from: localUri, to: cachePath });
        return cachePath;
      })
      .then((finalPath) => {
        setImgUri(finalPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const recognizedText = await MlKitOcr.recognizeTextAsync(path);
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText("");
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo OCR Example</Text>
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Recognize"
            onPress={() => {
              recognizeTextFromImage(imgUri);
            }}
          />
        </View>
      </View>
      {imgUri && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {!isLoading && <Text style={styles.resultText}>{text}</Text>}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 30,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  resultText: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
