import * as React from 'react';
import { Text, View, StyleSheet ,TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      domState : 'normal',
      hasCameraPermissions : null,
      scanned : false,
      scannedData : ""
    }
  }

  getCameraPermission = async domState =>{
    const {status} = await Camera.requestCameraPermissionsAsync();
    this.setState({
      hasCameraPermissions :status === 'granted',
      scanned :false,
      domState : domState
    })
  }


  handleBarCode = async ({type,data}) =>{
    this.setState({
      domState : "normal",
      scanned : true, 
      scannedData : data
    })
  }
    render() {
      const {domState , hasCameraPermissions , scanned,scannedData} = this.state;

      if (domState === "scanner"){
        return(
          <BarCodeScanner onBarCodeScanned = {scanned ? undefined : this.handleBarCode}/>
        )
      }
        return (
            <View style={styles.container}>
                <Text>
                    {hasCameraPermissions ? scannedData : "Request for camera access"}
                </Text>
                <TouchableOpacity style = {{backgroundColor : "red" , alignSelf : "center"}}
                onPress = {()=> this.getCameraPermission("scanner")}>
                <Text>
                Scan QR Code
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }
})
