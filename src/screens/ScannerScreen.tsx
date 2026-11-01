import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { Camera } from 'react-native-camera-kit';

import { colors } from '../styles/colors';
import { supabase } from '../services/supabase';
import { obtenerAsistenciaHoy } from '../services/asistenciaService';
import { marcarAsistenciaQr } from '../services/asistenciaApi';

export default function ScannerScreen({ navigation }: any) {
  const [qrValue, setQrValue] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<any>(null);
  const [registrando, setRegistrando] = useState(false);

  const registrarAsistencia = async () => {
    try {
      setRegistrando(true);

      const resultado = await marcarAsistenciaQr(qrValue);

      console.log(resultado);

      Alert.alert('Éxito', 'Asistencia registrada correctamente');

      setQrValue('');
      setUsuarioEncontrado(null);
      setIsScanning(true);
    } catch (error: any) {
      console.log(error);

      Alert.alert('Error', error.message);
    } finally {
      setRegistrando(false);
    }
  };

  const buscarUsuario = async (codigoQr: string) => {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('codigo_qr', codigoQr)
        .eq('activo', true)
        .single();

      if (error || !data) {
        Alert.alert(
          'Usuario no encontrado',
          'El código QR no corresponde a un usuario activo.',
        );

        setQrValue('');
        setUsuarioEncontrado(null);
        setIsScanning(true);

        return;
      }

      setUsuarioEncontrado(data);
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'No se pudo consultar el usuario.');

      setQrValue('');
      setUsuarioEncontrado(null);
      setIsScanning(true);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        scanBarcode={isScanning}
        showFrame={false}
        onReadCode={async event => {
          if (!isScanning) {
            return;
          }

          const value = event.nativeEvent.codeStringValue;

          if (!value) {
            return;
          }

          setIsScanning(false);
          setQrValue(value);

          console.log('QR LEÍDO:', value);

          await buscarUsuario(value);
        }}
        onError={event => {
          console.log('CameraKit:', event.nativeEvent.errorMessage);
        }}
      />

      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Escanear QR</Text>

          <Text style={styles.subtitle}>
            Coloca el código dentro del recuadro
          </Text>
        </View>

        <View style={styles.scannerArea}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.topLeftCorner]} />

            <View style={[styles.corner, styles.topRightCorner]} />

            <View style={[styles.corner, styles.bottomLeftCorner]} />

            <View style={[styles.corner, styles.bottomRightCorner]} />
          </View>
        </View>

        <View style={styles.bottomPanel}>
          {qrValue ? (
            <>
              <Text style={styles.resultTitle}>Código detectado</Text>

              <Text style={styles.resultValue}>{qrValue}</Text>

              {usuarioEncontrado && (
                <>
                  <Text style={styles.userName}>
                    {usuarioEncontrado.nombres} {usuarioEncontrado.apellidos}
                  </Text>

                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={registrarAsistencia}
                    disabled={registrando}
                  >
                    <Text style={styles.confirmButtonText}>
                      {registrando ? 'Registrando...' : 'Registrar asistencia'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => {
                  setQrValue('');
                  setUsuarioEncontrado(null);
                  setIsScanning(true);
                }}
              >
                <Text style={styles.scanAgainButtonText}>
                  Escanear otra vez
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.infoText}>Esperando lectura...</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  header: {
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    marginTop: 5,
  },

  scannerArea: {
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scannerFrame: {
    width: 280,
    height: 280,
    position: 'relative',
  },

  corner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: colors.primary,
  },

  topLeftCorner: {
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopLeftRadius: 18,
  },

  topRightCorner: {
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 18,
  },

  bottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomLeftRadius: 18,
  },

  bottomRightCorner: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomRightRadius: 18,
  },

  bottomPanel: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 45,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },

  infoText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
  },

  resultTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },

  resultValue: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  userName: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 15,
  },

  confirmButton: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 15,
    marginBottom: 20,
  },

  confirmButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  scanAgainButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 5,
  },

  scanAgainButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  backButton: {
    marginTop: 60,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },

  backButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
