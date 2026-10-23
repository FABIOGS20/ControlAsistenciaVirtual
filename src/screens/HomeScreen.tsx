import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { colors } from '../styles/colors';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Control de Asistencia</Text>

      <Text style={styles.subtitle}>Panel del Portero</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={styles.optionIcon}>📷</Text>

        <Text style={styles.optionTitle}>Escanear QR</Text>

        <Text style={styles.optionDescription}>
          Registrar asistencia usando cámara
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate('ManualCode')}
      >
        <Text style={styles.optionIcon}>🔢</Text>

        <Text style={styles.optionTitle}>Código Manual</Text>

        <Text style={styles.optionDescription}>
          Registrar asistencia usando código institucional
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 25,
    justifyContent: 'center',
  },

  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.secondaryText,
    marginBottom: 40,
  },

  optionButton: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  optionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },

  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },

  optionDescription: {
    color: colors.secondaryText,
    fontSize: 14,
  },
});
