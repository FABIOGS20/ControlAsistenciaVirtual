import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { colors } from '../styles/colors';
import { loginSchema } from '../schemas/loginSchema';

import { supabase } from '../services/supabase';

export default function LoginScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('correo', usuario)
        .eq('password', password)
        .single();

      if (error || !data) {
        setErrors({
          password: 'Usuario o contraseña incorrectos',
        });
        return;
      }

      console.log('Usuario autenticado:', data);

      navigation.navigate('Home');
    } catch (err) {
      console.error(err);

      setErrors({
        password: 'Error al conectar con el servidor',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Control de Asistencia</Text>

      <Text style={styles.subtitle}>Institución Educativa</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={[styles.input, errors.usuario && styles.inputError]}
          placeholder="Ingrese su usuario"
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
        />
        {errors.usuario && (
          <Text style={styles.errorText}>{errors.usuario}</Text>
        )}
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Ingrese su contraseña"
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
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.secondaryText,
    marginBottom: 35,
  },

  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 5,
  },

  form: {
    gap: 10,
  },

  label: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '600',
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },

  inputError: {
    borderColor: colors.danger,
    borderWidth: 2,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },

  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
