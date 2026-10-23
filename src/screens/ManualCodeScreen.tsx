import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles/colors';

export default function ManualCodeScreen({ navigation }: any) {
  const [codigo, setCodigo] = useState('');

  const handleRegister = () => {
    if (!codigo.trim()) {
      return;
    }

    navigation.navigate('Success');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro Manual</Text>

      <Text style={styles.subtitle}>Ingrese el código institucional</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: DOC001"
        value={codigo}
        onChangeText={setCodigo}
        autoCapitalize="characters"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar Asistencia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: colors.secondaryText,
    marginBottom: 30,
  },

  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 18,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },

  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
