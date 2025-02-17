import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { getPhotosFromStorage, Photo } from "../utils/photoStorage";

const { width, height } = Dimensions.get("window");

export default function PhotoStack() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const loadedPhotos = await getPhotosFromStorage();

      // Sort photos by most recent (timestamp)
      const filteredByRecency = loadedPhotos.sort(
        (a, b) => b.timestamp - a.timestamp
      );

      // Ensure only the first 6 photos are set, if fewer than 6, display whatever is available
      setPhotos(
        filteredByRecency.slice(0, Math.min(6, filteredByRecency.length))
      );
    } catch (error) {
      console.error("Error Loading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePress = (image: Photo) => {
    setSelectedImage(image); // Set the selected image
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  // Format date (e.g., "December 8, 2024, 3:30 PM")
  const formatTimestamp = (timestamp: number) => {
    if (isNaN(timestamp)) {
      return "Invalid date";
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
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => item.uri + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.photoContainer}
              onPress={() => handleImagePress(item)} // Handle image press to open modal
            >
              <Image
                source={{ uri: "data:image/jpg;base64," + item.base64 }}
                style={styles.image}
              />
              <Text style={styles.timeStampText}>
                {formatTimestamp(item.timestamp)}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={3} // Display 3 images per row
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeModal}
          >
            <Entypo name="cross" size={45} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <>
              <Image
                source={{
                  uri: "data:image/jpg;base64," + selectedImage.base64,
                }}
                style={styles.enlargedImage}
              />
              <Text style={styles.timeStampText}>
                {formatTimestamp(selectedImage.timestamp)}
              </Text>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  textStyle: {
    marginTop: 10,
    fontSize: width * 0.04,
    color: "white",
    textAlign: "center",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  photoContainer: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: (width - 60) / 3,
    height: (width - 60) / 3,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    padding: width / 20,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  enlargedImage: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
  },
  modalCloseButton: {
    paddingBottom: 5,
    borderRadius: 50,
  },
  timeStampText: {
    marginTop: 10,
    fontSize: width * 0.02,
    color: "white",
    textAlign: "center",
  },
});
