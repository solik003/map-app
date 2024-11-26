// src/firebaseApi.ts
import axios from 'axios';

// Firebase Realtime Database URL (replace with your own Firebase URL)
const FIREBASE_URL = 'https://your-project-id.firebaseio.com/markers.json';

// Add a marker to Firebase
export const addMarker = async (markerData: any) => {
  try {
    const response = await axios.post(FIREBASE_URL, markerData);
    return response.data; // Returns the added marker data with Firebase-generated ID
  } catch (error) {
    console.error('Error adding marker:', error);
  }
};

// Fetch all markers from Firebase
export const fetchMarkers = async () => {
  try {
    const response = await axios.get(FIREBASE_URL);
    return response.data; // Returns the markers data
  } catch (error) {
    console.error('Error fetching markers:', error);
  }
};

// Delete a marker from Firebase using its ID
export const deleteMarker = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://your-project-id.firebaseio.com/markers/${id}.json`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting marker:', error);
  }
};

// Update the position of a marker
export const updateMarkerPosition = async (id: string, newPosition: any) => {
  try {
    const response = await axios.put(
      `https://your-project-id.firebaseio.com/markers/${id}.json`,
      newPosition
    );
    return response.data;
  } catch (error) {
    console.error('Error updating marker position:', error);
  }
};
