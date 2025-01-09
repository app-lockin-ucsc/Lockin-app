import AsyncStorage from "@react-native-async-storage/async-storage";

// Export the Photo interface so it can be used in other files
export interface Photo {
  base64: string;
  uri: string;
  timestamp: number;
}

// Function to save photos along with their URI and timestamp
export const savePhotosToStorage = async (photos: Photo[]) => {
  try {
    const photosJson = JSON.stringify(photos);
    await AsyncStorage.setItem("photos", photosJson); // Save the photos array
  } catch (error) {
    console.error("Error saving photos to AsyncStorage:", error);
  }
};

// Function to get all photos from storage
export const getPhotosFromStorage = async (): Promise<Photo[]> => {
  try {
    const photosData = await AsyncStorage.getItem("photos");
    return photosData ? JSON.parse(photosData) : []; // Parse and return the photos or return an empty array if none
  } catch (error) {
    console.error("Error fetching photos from storage:", error);
    return [];
  }
};
