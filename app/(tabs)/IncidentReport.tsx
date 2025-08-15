import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ban, Hand, DollarSign, TriangleAlert as AlertTriangle, Users, Scale, Car, X, Phone, Volume2, Cigarette, Trash2, FileText } from 'lucide-react-native';
import GradientBackground from '@/components/GradientBackground';
import Logo from '@/components/Logo';
import IncidentButton from '@/components/IncidentButton';
import { storageService, HazardReport } from '@/services/storage';

export default function Report() {
  const handleIncidentReport = async (type: string) => {
    // For demo purposes, we'll create a mock report
    const report: HazardReport = {
      id: Date.now().toString(),
      type,
      description: `${type} incident reported`,
      latitude: 14.5995 + (Math.random() - 0.5) * 0.01,
      longitude: 120.9842 + (Math.random() - 0.5) * 0.01,
      timestamp: new Date(),
      userId: 'user123',
    };

    await storageService.saveHazardReport(report);
    
    Alert.alert(
      'Report Submitted',
      `Your ${type} report has been submitted successfully. Thank you for helping keep commuters safe!`,
      [{ text: 'OK' }]
    );
  };

  const incidentTypes = [
    {
      title: 'Without Plate Number',
      color: '#dc2626',
      icon: <Ban size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Without Plate Number'),
    },
    {
      title: 'Harassment',
      color: '#a855f7',
      icon: <Hand size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Harassment'),
    },
    {
      title: 'Overcharging',
      color: '#65a30d',
      icon: <DollarSign size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Overcharging'),
    },
    {
      title: 'Reckless Driving',
      color: '#ca8a04',
      icon: <AlertTriangle size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Reckless Driving'),
    },
    {
      title: 'Overloading',
      color: '#16a34a',
      icon: <Users size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Overloading'),
    },
    {
      title: 'Discrimination',
      color: '#9333ea',
      icon: <Scale size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Discrimination'),
    },
    {
      title: 'Unsafe Vehicle Condition',
      color: '#0ea5e9',
      icon: <Car size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Unsafe Vehicle Condition'),
    },
    {
      title: 'Obstruction',
      color: '#dc2626',
      icon: <X size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Obstruction'),
    },
    {
      title: 'Denial of Service',
      color: '#6b7280',
      icon: <Phone size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Denial of Service'),
    },
    {
      title: 'Noise Disturbance',
      color: '#6b7280',
      icon: <Volume2 size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Noise Disturbance'),
    },
    {
      title: 'Smoking or Vaping',
      color: '#dc2626',
      icon: <Cigarette size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Smoking or Vaping'),
    },
    {
      title: 'Unhygienic Conditions',
      color: '#ca8a04',
      icon: <Trash2 size={24} color="#ffffff" />,
      onPress: () => handleIncidentReport('Unhygienic Conditions'),
    },
  ];

  const handleOthersPress = () => {
    Alert.alert(
      'Other Incident',
      'Please describe the incident in detail.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          onPress: () => handleIncidentReport('Other')
        }
      ]
    );
  };

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Logo size="small" />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Incident Reporter</Text>
            <Text style={styles.subtitle}>
              Report incidents. Help keep commuting safe for everyone.{'\n'}
              Anonymous, quick, and reviewed by LGU & advocates.
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Incident Type</Text>
          </View>

          <View style={styles.grid}>
            {incidentTypes.map((incident, index) => (
              <View key={index} style={styles.gridItem}>
                <IncidentButton
                  title={incident.title}
                  color={incident.color}
                  icon={incident.icon}
                  onPress={incident.onPress}
                />
              </View>
            ))}
          </View>

          <View style={styles.othersContainer}>
            <IncidentButton
              title="Others: Please specify"
              color="#2563eb"
              icon={<FileText size={24} color="#ffffff" />}
              onPress={handleOthersPress}
            />
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
  titleContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
  },
  gridItem: {
    width: '30%',
    aspectRatio: 1,
  },
  othersContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
});