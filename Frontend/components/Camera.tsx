import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCamera() {
    setIsCameraOpen((current) => (current === true ? false : true));
  }

  return (
    <SafeAreaView>
      {isCameraOpen ? ( //state when camera IS open!
        <View style={styles.container}>
          <CameraView style={styles.cameraContainer} facing={facing}>
            <View style={styles.flipCameraContainer}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.textStyle}>Flip camera</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.closeCameraContainer}>
              <TouchableOpacity
                style={styles.cameraClose}
                onPress={toggleCamera}
              >
                <Text style={styles.textStyle}>Close Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      ) : (
        //state when camera is closed.
        <View style={styles.openCameraContainer}>
          <TouchableOpacity style={styles.cameraOpen} onPress={toggleCamera}>
            <Text style={styles.textStyle}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
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
    left: 10,
  },

  flipButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 90,
    backgroundColor: "red",
    borderRadius: 50,
  },

  closeCameraContainer: {
    position: "absolute",
    bottom: 10,
    left: 300,
  },

  cameraClose: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 90,
    backgroundColor: "pink",
    borderRadius: 50,
  },

  openCameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  cameraOpen: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 90,
    backgroundColor: "grey",
    borderRadius: 50,
  },

  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
});
