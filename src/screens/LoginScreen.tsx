import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { colors } from '../styles/colors';
import { loginSchema } from '../schemas/loginSchema';

import { login } from '../services/authService';

export default function LoginScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    usuario?: string;
    password?: string;
  }>({});

  const handleLogin = async () => {
    const result = loginSchema.safeParse({
      usuario,
      password,
    });

    if (!result.success) {
      const newErrors: {
        usuario?: string;
        password?: string;
      } = {};

      result.error.issues.forEach(issue => {
        const field = issue.path[0] as 'usuario' | 'password';

        if (!newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });

      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const { data, error } = await login(usuario, password);

      if (error || !data) {
        setErrors({
          password: 'Usuario o contraseña incorrectos',
        });
        return;
      }

      navigation.replace('Home', {
        usuario: data,
      });
    } catch (err) {
      setErrors({
        password: 'Error al conectar con el servidor',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Control de Asistencia</Text>

        <Text style={styles.subtitle}>Sistema de Control de Asistencia</Text>

        <TextInput
          style={[styles.input, errors.usuario && styles.inputError]}
          placeholder="Correo electrónico"
          value={usuario}
          onChangeText={text => {
            setUsuario(text);

            const result = loginSchema.shape.usuario.safeParse(text);

            setErrors(prev => ({
              ...prev,
              usuario: result.success
                ? undefined
                : result.error.issues[0].message,
            }));
          }}
          autoCapitalize="none"
          editable={!loading}
        />

        {errors.usuario && (
          <Text style={styles.errorText}>{errors.usuario}</Text>
        )}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);

            const result = loginSchema.shape.password.safeParse(text);

            setErrors(prev => ({
              ...prev,
              password: result.success
                ? undefined
                : result.error.issues[0].message,
            }));
          }}
          editable={!loading}
        />

        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.white} size="small" />

              <Text style={styles.loginButtonText}> Verificando...</Text>
            </View>
          ) : (
            <Text style={styles.loginButtonText}>Ingresar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.secondaryText,
    marginBottom: 35,
  },

  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 10,
  },

  inputError: {
    borderColor: colors.danger,
    borderWidth: 2,
  },

  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },

  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonDisabled: {
    opacity: 0.8,
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
