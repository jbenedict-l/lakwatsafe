import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, MapPin } from 'lucide-react-native';

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  showLocationIcon?: boolean;
  editable?: boolean;
}

export default function SearchBar({ 
  placeholder, 
  value, 
  onChangeText, 
  onPress,
  showLocationIcon = false,
  editable = true 
}: SearchBarProps) {
  const content = (
    <View style={styles.container}>
      {showLocationIcon && (
        <MapPin size={20} color="#6b7280" style={styles.locationIcon} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
      <Search size={20} color="#6b7280" />
    </View>
  );

  if (onPress && !editable) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    gap: 12,
  },
  locationIcon: {
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
});