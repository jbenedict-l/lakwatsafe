import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import Logo from '@/components/Logo';

export default function Landing() {
  const handleEnterApp = () => {
    router.replace('/(tabs)');
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Features</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Logo size="large" />
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to LakwatSafe</Text>
            <Text style={styles.description}>
              Your trusted companion for safe and secure commuting. 
              Report hazards, discover safe routes, and contribute to a 
              safer transportation community for everyone.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.enterButton}
            onPress={handleEnterApp}
            activeOpacity={0.8}
          >
            <Text style={styles.enterButtonText}>Enter App</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 24,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  titleContainer: {
    marginTop: 48,
    marginBottom: 64,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  enterButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  enterButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});