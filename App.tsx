import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera/next';
import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
// import QRCode from 'qrcode';
import QRCode from 'react-native-qrcode-svg';


export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState("back");
  const [showCamera, setShowCamera] = useState(true);
  const [text, setText] = useState('');
  const [data, setData] = useState('https://example.com');


  const gg = () => {
    setData(text)
  }

  useEffect(() => {
    void requestPermission().then(console.log);
  }, []);

  if (!permission?.granted) {
    return null;
  }

  if (!showCamera) {
    return (
      <SafeAreaView style={[styles.container,
      { alignItems: 'center', justifyContent: 'center' }]}>
        <Button onPress={() => setShowCamera(true)} title='Open' />
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setText(data);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );

  };

  return (
    <SafeAreaView>
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
      <TextInput
        value={text}
      />
      <View style={styles.qrCodeContainer}>
        <QRCode value={data} size={200} />
      </View>

      <Button title="Press Me" onPress={gg} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: 200,
    margin: 20,
    borderWidth: 1,
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
  },
  qrCodeContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
});