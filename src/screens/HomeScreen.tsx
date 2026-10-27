import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { colors } from '../styles/colors';

export default function HomeScreen({ navigation, route }: any) {
  const usuario = route.params?.usuario;

  const nombreUsuario = usuario?.nombres?.trim() || 'Usuario';

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
        />

        <Text style={styles.welcomeText}>Bienvenido, {nombreUsuario}</Text>

        <Text style={styles.title}>Control de Asistencia</Text>

        <Text style={styles.subtitle}>Selecciona un método de registro</Text>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() =>
            navigation.navigate('Scanner', {
              usuarioSesion: usuario,
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.optionIconContainer}>
            <Text style={styles.optionIcon}>📷</Text>
          </View>

          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Escanear QR</Text>

            <Text style={styles.optionDescription}>
              Registrar asistencia utilizando la cámara del dispositivo
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() =>
            navigation.navigate('ManualCode', {
              usuarioSesion: usuario,
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.optionIconContainer}>
            <Text style={styles.optionIcon}>🔢</Text>
          </View>

          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Código institucional</Text>

            <Text style={styles.optionDescription}>
              Registrar asistencia introduciendo el código del trabajador
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutIcon}>↪</Text>

          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },

  logo: {
    width: 125,
    height: 125,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 15,
  },

  welcomeText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 6,
  },

  title: {
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text,
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.secondaryText,
    marginTop: 5,
    marginBottom: 32,
  },

  optionButton: {
    width: '100%',
    minHeight: 120,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  optionIconContainer: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  optionIcon: {
    fontSize: 31,
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },

  optionDescription: {
    color: colors.secondaryText,
    fontSize: 13,
    lineHeight: 19,
  },

  arrow: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '300',
    marginLeft: 8,
  },

  logoutButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutIcon: {
    color: colors.danger,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },

  logoutText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
