import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Dimensions } from "react-native";
import ActionButton from "./ActionButton";

const { width: screenWidth } = Dimensions.get("window");

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mediaPermission?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermission]);

  const handleCameraClosePress = () => router.push("/(tabs)");

  const handleCameraCapturePress = async () => {
    await capturePhoto();
    router.push("/(tabs)");
  };

  const toggleCameraFacing = () =>
    setFacing((current) => (current === "back" ? "front" : "back"));

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const photo = await cameraRef.current.takePictureAsync(options);
      if (photo?.uri) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        alert("Photo saved to your gallery!");
      }
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>We need your permission to show the camera.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topCameraBar}>
        <View style={styles.textStyleContainer}>
          <Text style={styles.textStyle}>Lockin</Text>
        </View>
        <TouchableOpacity
          style={styles.cameraClose}
          onPress={handleCameraClosePress}
        >
          <Entypo name="cross" size={45} color="white" />
        </TouchableOpacity>
      </View>
      <CameraView
        ref={cameraRef}
        style={styles.cameraContainer}
        facing={facing}
      ></CameraView>

      <View style={styles.botCameraControl}>
        <ActionButton
          onPress={toggleCameraFacing}
          icon={<AntDesign name="retweet" size={50} color="white" />}
          containerStyle={styles.flipButtonContainer}
        />
        <ActionButton
          onPress={handleCameraCapturePress}
          containerStyle={styles.captureButtonContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
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
  botCameraControl: {
    width: "100%",
    height: "15%",
    backgroundColor: "black",
    flexDirection: "row", // Make it row layout to position text and close button
    alignItems: "center", // Vertically center the items
    justifyContent: "center",
    paddingHorizontal: 0,
    position: "absolute", //Button always at the bottom
    bottom: 0,
  },
  flipButtonContainer: {
    position: "absolute",
    right: 10,
  },
  captureButtonContainer: {
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "white",
  },
});
