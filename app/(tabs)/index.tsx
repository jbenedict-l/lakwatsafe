import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '@/components/GradientBackground';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import MapView, { Marker } from 'react-native-maps';
import { storageService, HazardReport } from '@/services/storage';

const { width: screenWidth } = Dimensions.get('window');
const mapWidth = screenWidth - 32;
const mapHeight = mapWidth * 0.75;

export default function Dashboard() {
  const [hazardReports, setHazardReports] = useState<HazardReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadHazardReports();
  }, []);

  const loadHazardReports = async () => {
    const reports = await storageService.getHazardReports();
    setHazardReports(reports);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Logo size="large" />
          </View>
          
          <SearchBar
            placeholder="Search a route, hazard, or location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
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
            >
              {hazardReports.map((report) => (
                <Marker
                  key={report.id}
                  coordinate={{
                    latitude: report.latitude,
                    longitude: report.longitude,
                  }}
                  title={report.type}
                  description={report.description}
                  pinColor="#dc2626"
                />
              ))}
            </MapView>
          </View>
        </ScrollView>
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
  mapContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  map: {
    width: mapWidth,
    height: mapHeight,
    borderRadius: 16,
  },
});