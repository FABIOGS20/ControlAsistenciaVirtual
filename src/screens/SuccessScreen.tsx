import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles/colors';

export default function SuccessScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.icon}>✅</Text>

      <Text style={styles.title}>
        Asistencia Registrada
      </Text>

      <View style={styles.card}>
        <Text style={styles.name}>
          Juan Pérez
        </Text>

        <Text style={styles.position}>
          Profesor
        </Text>

        <Text style={styles.time}>
          08:01 AM
        </Text>
      </View>

      <Text style={styles.message}>
        Registro guardado correctamente.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={styles.buttonText}>
          Volver a Escanear
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  icon: {
    fontSize: 90,
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 25,
  },

  card: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },

  position: {
    fontSize: 18,
    color: colors.secondaryText,
    marginTop: 5,
  },

  time: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 15,
  },

  message: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: 25,
  },

  button: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});