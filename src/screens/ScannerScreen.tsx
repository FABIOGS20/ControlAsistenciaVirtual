import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '../styles/colors';

export default function ScannerScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escanear Código</Text>

      <Text style={styles.subtitle}>
        Apunte la cámara hacia el código QR o código institucional
      </Text>

      <View style={styles.cameraPlaceholder}>
        <Text style={styles.cameraIcon}>📷</Text>

        <Text style={styles.cameraText}>Vista previa de cámara</Text>
      </View>

      <TouchableOpacity
        style={styles.testButton}
        onPress={() => navigation.navigate('Success')}
      >
        <Text style={styles.testButtonText}>Simular Escaneo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>← Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    color: colors.secondaryText,
    marginBottom: 30,
  },

  cameraPlaceholder: {
    height: 350,
    borderWidth: 3,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  cameraIcon: {
    fontSize: 80,
    marginBottom: 10,
  },

  cameraText: {
    fontSize: 18,
    color: colors.secondaryText,
  },

  testButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
  },

  testButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  homeButton: {
    marginTop: 15,
  },

  homeButtonText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
