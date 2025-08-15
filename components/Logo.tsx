import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';

interface LogoProps {
  size?: 'small' | 'large';
}

export default function Logo({ size = 'large' }: LogoProps) {
  const isLarge = size === 'large';
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, isLarge && styles.iconContainerLarge]}>
        <Navigation 
          size={isLarge ? 24 : 18} 
          color="#60a5fa" 
          style={styles.roadIcon}
        />
        <MapPin 
          size={isLarge ? 28 : 20} 
          color="#f59e0b" 
          style={styles.pinIcon}
        />
      </View>
      <Text style={[styles.text, isLarge && styles.textLarge]}>
        LakwatSafe
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    position: 'relative',
    width: 32,
    height: 32,
  },
  iconContainerLarge: {
    width: 40,
    height: 40,
  },
  roadIcon: {
    position: 'absolute',
    left: 0,
    top: 2,
  },
  pinIcon: {
    position: 'absolute',
    right: -2,
    top: 0,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  textLarge: {
    fontSize: 24,
  },
});