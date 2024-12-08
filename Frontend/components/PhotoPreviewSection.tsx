// ActionButton.tsx
import React from "react";
import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CameraCapturedPicture } from "expo-camera";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface PreviewSectionProps {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
  facing: "front" | "back";
}

const PhotoPreviewSection = ({
  photo,
  handleRetakePhoto,
  facing,
}: PreviewSectionProps) => {
  const router = useRouter();

  const handleSubmitPhoto = async () => {
    //if saving photo so move this to preview screen.
    if (photo?.uri) {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      await alert("Photo saved to your gallery!");
      //after saving the photo and alerting the user, then go back to home screen.
      router.push("/(tabs)");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topCameraBar}>
        <View style={styles.textStyleContainer}>
          <Text style={styles.textStyle}>Lockin</Text>
        </View>
        <TouchableOpacity
          style={styles.cameraClose}
          onPress={handleRetakePhoto}
        >
          <Entypo name="cross" size={45} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Image
          style={[
            styles.previewContainer,
            facing == "front" && { transform: [{ scaleX: -1 }] },
          ]}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmitPhoto}>
          <AntDesign name="rightcircleo" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
  },

  topCameraBar: {
    width: "100%",
    height: "10%",
    backgroundColor: "black",
    flexDirection: "row", // Make it row layout to position text and close button
    alignItems: "center", // Vertically center the items
    paddingHorizontal: 10,
    position: "relative", // Necessary for absolute positioning of the close button
  },
  textStyleContainer: {
    flex: 1, // Allow text container to take available space
    justifyContent: "center", // Vertically center the text
    alignItems: "center", // Horizontally center the text
  },
  textStyle: {
    fontSize: 30,
    color: "white",
  },
  cameraClose: {
    position: "absolute", // Position the close button absolutely
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
  },
  box: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    backgroundColor: "grey",
  },
  previewContainer: {
    width: "100%",
    height: "100%",
    aspectRatio: 3 / 5,
    resizeMode: "cover",
  },
  buttonContainer: {
    width: "100%",
    height: "15%",
    backgroundColor: "black",
    flexDirection: "row", // Make it row layout to position text and close button
    alignItems: "center", // Vertically center the items
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    position: "absolute", //Button always at the bottom
    bottom: 0,
  },
});

export default PhotoPreviewSection;
