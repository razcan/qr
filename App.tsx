import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState("back");
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    void requestPermission().then(console.log);
  }, []);

  if (!permission?.granted) {
    return null;
  }

  if (!showCamera) {
    return (
      <SafeAreaView style={[styles.container,
      { alignItems: 'center', justifyContent: 'center', width: 300, height: 300 }]}>
        <Button onPress={() => setShowCamera(true)} title='Open' />
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        // facing={type}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "ean13",
            "code128",
            "code39",
            "upc_a",
            "upc_e",
            "ean8",
            "itf14",
            "codabar",
            "aztec",
            "datamatrix",
            "code93",
            "itf14"],
        }}

      >

      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
  },
});