import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import ProgressCircle from "react-native-progress/Circle";
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from "react-native-tesseract-ocr";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [fetchingTrainingData, setFetchingTrainingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const imgSrc = require("./assets/sample.png");
  const [imgUri, setImgUri] = useState(null);
  const [text, setText] = useState("");

  async function getTrainedData() {
    const trainedDataUrl =
      "https://github.com/tesseract-ocr/tessdata/raw/3.04.00/eng.traineddata";
    const trainedDataDir = FileSystem.cacheDirectory + "tessdata/";
    const trainedDataPath = trainedDataDir + "eng.traineddata";
    const pathInfo = await FileSystem.getInfoAsync(trainedDataPath);
    if (pathInfo.exists) {
      setFetchingTrainingData(false);
    } else {
      alert("Training data does not exist. Downloading...");
      await FileSystem.makeDirectoryAsync(trainedDataDir, { intermediates: true });
      FileSystem.downloadAsync(trainedDataUrl, trainedDataPath)
        .then(({ uri }) => {
          alert(`Finished downloading to ${uri}`);
          setFetchingTrainingData(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  Asset.fromModule(require("./assets/sample.png"))
    .downloadAsync()
    .then(({ localUri }) => setImgUri(localUri));

  useEventListener("onProgressChange", (p) => {
    setProgress(p.percent / 100);
  });

  useEffect(() => {
    getTrainedData();
  }, []);

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions
      );
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText("");
    }

    setIsLoading(false);
    setProgress(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo OCR Example</Text>
      <StatusBar style="auto" />
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={fetchingTrainingData || isLoading}
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
          {isLoading ? (
            <ProgressCircle showsText progress={progress} />
          ) : (
            <Text style={styles.resultText}>{text}</Text>
          )}
        </View>
      )}
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
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
