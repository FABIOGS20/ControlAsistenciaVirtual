import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useCameraPermission } from 'react-native-vision-camera';

import { CodeScanner } from 'react-native-vision-camera-barcode-scanner';

import { colors } from '../styles/colors';
import { supabase } from '../services/supabase';

export default function ScannerScreen({ navigation }: any) {
  const isFocused = useIsFocused();

  const { hasPermission, requestPermission } = useCameraPermission();

  const [qrValue, setQrValue] = useState('');
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const getPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };

    getPermission();
  }, [hasPermission, requestPermission]);

  const handleScanned = async (codes: any[]) => {
    if (!isScanning) {
      return;
    }

    if (!codes?.length) {
      return;
    }

    const value = codes[0]?.rawValue;

    if (!value) {
      return;
    }

    setIsScanning(false);
    setQrValue(value);

    console.log('QR LEÍDO:', value);
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('codigo_qr', value)
      .single();

    console.log(data);
    console.log(error);
  };

  if (!hasPermission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>
          Esperando permiso de cámara...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CodeScanner
        onError={() => {
          console.log();
        }}
        style={StyleSheet.absoluteFill}
        isActive={isFocused && isScanning}
        barcodeFormats={['qr-code']}
        onBarcodeScanned={handleScanned}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Escanear QR</Text>

          <Text style={styles.subtitle}>
            Coloca el código dentro del recuadro
          </Text>
        </View>

        <View style={styles.scannerArea}>
          <View style={styles.scannerFrame} />
        </View>

        <View style={styles.bottomPanel}>
          {qrValue ? (
            <>
              <Text style={styles.resultTitle}>Código detectado:</Text>

              <Text style={styles.resultValue}>{qrValue}</Text>

              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => {
                  setQrValue('');
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

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.homeButtonText}>← Volver</Text>
          </TouchableOpacity>
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

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  permissionText: {
    fontSize: 16,
    color: colors.text,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },

  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  title: {
    fontSize: 26,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scannerFrame: {
    width: 280,
    height: 280,
    borderWidth: 4,
    borderColor: colors.primary,
    borderRadius: 20,
  },

  bottomPanel: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    marginBottom: 15,
  },

  scanAgainButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },

  scanAgainButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  homeButton: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
  },

  homeButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
