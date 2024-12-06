import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const router = useRouter();

  //Asking for permission on first render only. Basically asks once
  useEffect(() => {
    if (!mediaPermission?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermission]);

  //when closing camera, go back to homepage.
  const handleCameraClosePress = () => {
    router.push("/(tabs)");
  };

  //handle which way the camera is facing.
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const photo = await cameraRef.current.takePictureAsync(options); // Call the method on the camera instance
      if (photo?.uri) {
        await MediaLibrary.saveToLibraryAsync(photo.uri); // Save the photo to the library
        alert("Photo saved to your gallery!");
      }
    }
  };

  //if the user does not give perms to use camera show nothing.
  if (!permission) {
    return <View />;
  }
  //if the user says no to perms. prompt with error.
  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        //state when camera IS open!
        <CameraView
          ref={cameraRef}
          style={styles.cameraContainer}
          facing={facing}
        >
          <View style={styles.flipCameraContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <AntDesign name="retweet" size={50} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.captureCameraContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={capturePhoto}>
              <AntDesign name="camera" size={50} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.closeCameraContainer}>
            <TouchableOpacity
              style={styles.cameraClose}
              onPress={handleCameraClosePress}
            >
              <Entypo name="circle-with-cross" size={70} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 400,
  },

  flipCameraContainer: {
    position: "absolute",
    bottom: 10,
    left: 300,
  },

  flipButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },

  closeCameraContainer: {
    position: "absolute",
    top: -20,
    left: -10,
  },

  cameraClose: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 90,
    borderRadius: 50,
  },

  captureCameraContainer: {
    position: "absolute",
    bottom: 10,
    left: 150,
  },

  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
