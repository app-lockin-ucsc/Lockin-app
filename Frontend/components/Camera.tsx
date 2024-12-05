import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
