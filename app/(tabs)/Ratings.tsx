import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import GradientBackground from '@/components/GradientBackground';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import StarRating from '@/components/StarRating';
import { storageService, RouteRating } from '@/services/storage';

export default function Ratings() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleOriginPress = () => {
    // Handle origin selection
    console.log('Select origin');
  };

  const handleDestinationPress = () => {
    // Handle destination selection
    console.log('Select destination');
  };

  const handleRateRoute = () => {
    if (!origin || !destination) {
      Alert.alert('Missing Information', 'Please select both origin and destination before rating.');
      return;
    }
    setShowRatingModal(true);
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating before submitting.');
      return;
    }

    const ratingData: RouteRating = {
      id: Date.now().toString(),
      routeId: `${origin}-${destination}`,
      rating,
      comment,
      timestamp: new Date(),
      userId: 'user123',
    };

    await storageService.saveRouteRating(ratingData);
    
    setShowRatingModal(false);
    setRating(0);
    setComment('');
    
    Alert.alert(
      'Thank You!',
      'Your rating has been submitted successfully. Your feedback helps other users!',
      [{ text: 'OK' }]
    );
  };

  const handleCloseModal = () => {
    setShowRatingModal(false);
    setRating(0);
    setComment('');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Logo size="small" />
        </View>

        <SearchBar
          placeholder="Choose origin..."
          value={origin}
          onChangeText={setOrigin}
          showLocationIcon={true}
        />

        <View style={styles.spacing} />

        <SearchBar
          placeholder="Choose destination..."
          value={destination}
          onChangeText={setDestination}
          showLocationIcon={true}
        />

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 14.5995,
              longitude: 120.9842,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          
          <TouchableOpacity 
            style={styles.rateButton}
            onPress={handleRateRoute}
          >
            <Text style={styles.rateButtonText}>Rate This Route</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showRatingModal}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Rate This Route</Text>
              
              <Text style={styles.modalDescription}>
                Your feedback helps other users!{'\n'}
                Whether it's a suggestion or concern, your input{'\n'}
                ensures we keep showing the best route possible.
              </Text>

              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size={32}
              />

              <TextInput
                style={styles.commentInput}
                placeholder="Comment"
                placeholderTextColor="#9ca3af"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={handleSubmitRating}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  spacing: {
    height: 16,
  },
  mapContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  rateButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  commentInput: {
    width: '100%',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
    marginBottom: 24,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#374151',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});