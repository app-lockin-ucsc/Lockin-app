import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { getPhotosFromStorage, Photo } from "../utils/photoStorage";
import { Dimensions } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as MediaLibrary from "expo-media-library";
import FlashMessage, { showMessage } from "react-native-flash-message";
const { width, height } = Dimensions.get("window");

const Feed = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const loadedPhotos = await getPhotosFromStorage();
      const filteredPhotos = loadedPhotos
        .filter((photo) => {
          const currentTime = Date.now();
          return currentTime - photo.timestamp <= 24 * 60 * 60 * 1000; // gets photos only taken in the past 24 hours.
        })
        .sort((a, b) => b.timestamp - a.timestamp);

      setPhotos(filteredPhotos);
      setLoading(false);
    } catch (error) {
      console.error("Error Loading photos:", error);
      throw error;
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadPhotos();
      setRefreshing(false);
    } catch (error) {
      console.error("Error Refreshing page.", error);
      throw error;
    }
  };

  // Format date (e.g., "December 8, 2024, 3:30 PM")
  const formatTimestamp = (timestamp: number) => {
    if (isNaN(timestamp)) {
      return "Invalid date";
    }

    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  //message for when user is trying to save their picture to their phone
  const handleShowMessage = () => {
    showMessage({
      message: "Saved",
      description: "Your image can be found in your photo library.",
      type: "success",
      icon: "auto", // based off type.
      backgroundColor: "black",
      color: "white",
      duration: 4000,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={"white"} />
        </View>
      ) : photos.length > 0 ? (
        // list of the images.
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              {/* OKAY SO not a huge fan of how the text is formatted and setup right now. 
                talk to team and ask for a possible new placement. Maybe under neath like a caption typa vibe?*/}
              <View style={styles.textContainer}>
                {/*For later use. BUT after lockin complete. show how long the user was lockedin for. */}
                <Text style={styles.textStyle}>Add time lockedin for here</Text>
                <Text style={styles.textStyle}>
                  {formatTimestamp(item.timestamp)}
                </Text>
              </View>
              <Image
                source={{ uri: "data:image/jpg;base64," + item.base64 }}
                style={styles.image}
              />
              {/* download button. */}
              <TouchableOpacity
                onPress={async () => {
                  await MediaLibrary.saveToLibraryAsync(item.uri);
                  handleShowMessage();
                }}
              >
                <View style={styles.downloadBtnContainer}>
                  <AntDesign name="download" size={30} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>No photos available</Text>
      )}
      <FlashMessage position={"top"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Align content to the top
    padding: width * 0.05, // 5% of screen width for padding
  },
  photoContainer: {
    flex: 1,
    marginBottom: height * 0.03, // 5% of screen height for margin between items
    overflow: "hidden",
    width: "100%",
    position: "relative",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: width * 0.01, // 1% of the height of the screen.
  },
  textStyle: {
    marginTop: 10,
    fontSize: width * 0.04, // Font size relative to screen width
    color: "white",
    textAlign: "center",
  },

  image: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.5, // 40% of screen height
    resizeMode: "cover",
    borderRadius: 10,
  },
  downloadBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: height * 0.01, // 1% of the height of the screen.
    paddingRight: width * 0.01, // 1% of the width of the screen.
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Feed;
