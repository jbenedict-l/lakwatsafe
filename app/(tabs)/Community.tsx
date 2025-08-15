import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import SearchBar from '@/components/SearchBar';
import StarRating from '@/components/StarRating';
import { storageService, RouteRequest } from '@/services/storage';

export default function Community() {
  const [routeRequests, setRouteRequests] = useState<RouteRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'recent' | 'popular'>('recent');

  useEffect(() => {
    loadRouteRequests();
  }, []);

  const loadRouteRequests = async () => {
    const requests = await storageService.getRouteRequests();
    setRouteRequests(requests.reverse()); // Show newest first
  };

  const handleOriginPress = () => {
    // Handle origin selection
    console.log('Select origin');
  };

  const handleDestinationPress = () => {
    // Handle destination selection
    console.log('Select destination');
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const reportDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - reportDate.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return reportDate.toLocaleDateString();
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>COMMUNITY</Text>
          <TouchableOpacity style={styles.profileButton}>
            <User size={32} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <SearchBar
          placeholder="Choose origin..."
          onPress={handleOriginPress}
          editable={false}
          showLocationIcon={true}
        />

        <View style={styles.spacing} />

        <SearchBar
          placeholder="Choose destination..."
          onPress={handleDestinationPress}
          editable={false}
          showLocationIcon={true}
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
            onPress={() => setActiveTab('recent')}
          >
            <Text style={[styles.tabText, activeTab === 'recent' && styles.activeTabText]}>
              RECENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'popular' && styles.activeTab]}
            onPress={() => setActiveTab('popular')}
          >
            <Text style={[styles.tabText, activeTab === 'popular' && styles.activeTabText]}>
              MOST POPULAR
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.feedContainer} showsVerticalScrollIndicator={false}>
          {routeRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.userInfo}>
                  <User size={24} color="#6b7280" />
                  <Text style={styles.userName}>{request.userName}</Text>
                </View>
                <StarRating rating={5} readonly size={16} />
              </View>
              
              <Text style={styles.transportation}>Transportation: {request.transportation}</Text>
              <Text style={styles.timestamp}>{formatDate(request.timestamp)}</Text>
              
              <Text style={styles.description}>{request.description}</Text>
            </View>
          ))}
          
          {routeRequests.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No route requests yet.</Text>
              <Text style={styles.emptySubtext}>Be the first to ask for route suggestions!</Text>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    height: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: '#ffffff',
  },
  feedContainer: {
    flex: 1,
    marginTop: 16,
  },
  requestCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  transportation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});