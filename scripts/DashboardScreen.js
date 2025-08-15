import * as Location from 'expo-location';
import { addDoc, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../App';
import RouteCard from '../components/RouteCard';
import UpdateCard from '../components/UpdateCard';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [routes, setRoutes] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getUserLocation();
    subscribeToRoutes();
    subscribeToUpdates();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required for better experience');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const subscribeToRoutes = () => {
    const routesQuery = query(
      collection(db, 'routes'),
      orderBy('safetyRating', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(routesQuery, (snapshot) => {
      const routesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRoutes(routesData);
    }, (error) => {
      console.error('Error fetching routes:', error);
    });

    return unsubscribe;
  };

  const subscribeToUpdates = () => {
    const updatesQuery = query(
      collection(db, 'updates'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(updatesQuery, (snapshot) => {
      const updatesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUpdates(updatesData);
    }, (error) => {
      console.error('Error fetching updates:', error);
    });

    return unsubscribe;
  };

  const handleSafetyCheck = async (isSafe) => {
    if (!userLocation) {
      Alert.alert('Location Required', 'Please enable location services first');
      return;
    }

    try {
      const statusData = {
        userId: auth.currentUser?.uid || 'guest',
        location: userLocation,
        safeStatus: isSafe,
        timestamp: new Date(),
      };

      await addDoc(collection(db, 'userStatus'), statusData);
      
      Alert.alert(
        'Status Updated',
        isSafe ? 'Glad you\'re safe!' : 'Stay alert! Help is available if needed.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Failed to update status. Please try again.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getUserLocation();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredRoutes = routes.filter(route =>
    route.origin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Icon name="location" size={20} color="#4A90E2" />
            </View>
            <Text style={styles.appTitle}>LakwatSafe</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person-circle-outline" size={28} color="#2c3e50" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search a route, hazard, or location..."
            placeholderTextColor="#bdc3c7"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Routes Near You Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Routes Near You</Text>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="map-outline" size={48} color="#bdc3c7" />
              <Text style={styles.emptyStateText}>No routes found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or check back later
              </Text>
            </View>
          )}
        </View>

        {/* Safety Check Section */}
        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>Are You Safe?</Text>
          <View style={styles.safetyButtons}>
            <TouchableOpacity
              style={[styles.safetyButton, styles.safeButton]}
              onPress={() => handleSafetyCheck(true)}
            >
              <Icon name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.safetyButtonText}>Yes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.safetyButton, styles.helpButton]}
              onPress={() => handleSafetyCheck(false)}
            >
              <Icon name="warning" size={24} color="#fff" />
              <Text style={styles.safetyButtonText}>No/Need Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Latest Reports Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Reports</Text>
            <TouchableOpacity>
              <Icon name="refresh" size={20} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          
          {updates.length > 0 ? (
            updates.map((update) => (
              <UpdateCard key={update.id} update={update} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="newspaper-outline" size={48} color="#bdc3c7" />
              <Text style={styles.emptyStateText}>No recent updates</Text>
              <Text style={styles.emptyStateSubtext}>
                Stay tuned for community reports and safety updates
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2c3e50',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  safetySection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  safetyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  safetyButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  safeButton: {
    backgroundColor: '#27ae60',
  },
  helpButton: {
    backgroundColor: '#e74c3c',
  },
  safetyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});

export default DashboardScreen;