import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { colors } from '../styles/colors';
import { marcarAsistenciaQr } from '../services/asistenciaApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ManualCodeScreen() {
  const [codigo, setCodigo] = useState('');
  const [registrando, setRegistrando] = useState(false);

  const handleRegister = async () => {
    if (!codigo.trim()) {
      Alert.alert('Validación', 'Ingrese un código.');
      return;
    }

    try {
      setRegistrando(true);

      const resultado = await marcarAsistenciaQr(codigo.trim().toUpperCase());

      console.log(resultado);

      if (resultado.detail) {
        Alert.alert('Información', resultado.detail);
      } else {
        Alert.alert(
          'Éxito',
          resultado.mensaje ||
            resultado.message ||
            'Asistencia registrada correctamente',
        );
      }

      setCodigo('');
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'No se pudo registrar la asistencia.',
      );
    } finally {
      setRegistrando(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <Text style={styles.icon}>⌨️</Text>
        <Text style={styles.title}>Registro Manual</Text>

        <Text style={styles.subtitle}>Ingrese el código institucional</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej: QR-DOC005"
          value={codigo}
          onChangeText={setCodigo}
          autoCapitalize="characters"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={registrando}
        >
          <Text style={styles.buttonText}>
            {registrando ? 'Registrando...' : 'Registrar Asistencia'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  icon: {
    fontSize: 70,
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
