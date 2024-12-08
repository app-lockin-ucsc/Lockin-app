import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { getPhotosFromStorage, Photo } from "../utils/photoStorage";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Feed = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  //loading photos, set loading true/false for spinning indicator.
  const loadPhotos = async () => {
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
  };
  //when swiping all the way down, refresh data.
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPhotos();
    setRefreshing(false);
  };

  // Format timestamp to a readable date (e.g., "December 8, 2024, 3:30 PM")
  const formatTimestamp = (timestamp: number) => {
    if (isNaN(timestamp)) {
      return "Invalid date"; // Return a fallback message if the timestamp is invalid
    }

    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color={"white"} />
        </View>
      ) : photos.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.photoContainer}>
              <Text style={styles.timestamp}>
                {formatTimestamp(item.timestamp)}
              </Text>
              <Image
                source={{ uri: "data:image/jpg;base64," + item.base64 }}
                style={styles.image}
              />
            </View>
          )}
        />
      ) : (
        <Text>No photos available</Text>
      )}
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
    marginBottom: height * 0.03, // 5% of screen height for margin between items
    overflow: "hidden",

    alignItems: "center",
    width: "100%",
  },
  image: {
    width: width * 0.9, // 90% of screen width for the image width
    height: height * 0.5, // 40% of screen height for the image height
    resizeMode: "cover",
    borderRadius: 10,
  },
  timestamp: {
    marginTop: 10,
    fontSize: width * 0.04, // Font size relative to screen width
    color: "white",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Feed;
