import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        buttonState: 'normal',
        scannedData : '',

      }
    }
    getCameraPermissions = async (Id) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          hasCameraPermissions: status === "granted",
          buttonState: Id,
          scanned: false
        });
      }
      handleBarCodeScanner = async({type, data})=>{
        this.setState({
          scanned: true,
          scannedData: data,
          buttonState: 'normal'
        });
      }
      render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if (buttonState !== "normal" && hasCameraPermissions){
            return(
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            );
          }
          else if (buttonState === "normal"){
              <View style={styles.container}>
                  <View>
                      <Image 
                     source={require("../assets/barcode-scanner.jpg")} 
                     style={{width : 200 , height: 200}} />
                     <Text style={{textAlign : 'center' , fontSize : 30}}>
                         Bar Code Scanner
                     </Text> 
                  </View>
                  <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>    
              <TouchableOpacity>
                  onPress={this.getCameraPermissions}
                  style={styles.scanButton}
                  title = "Bar Code Scanner"
                  <Text style={styles.buttonText} >Scan QR Code</Text>
              </TouchableOpacity>
              </View>
          }    
      }
    }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        displayText:{
          fontSize: 15,
          textDecorationLine: 'underline'
        },
        scanButton:{
          backgroundColor: '#2196F3',
          padding: 10,
          margin: 10
        },
        buttonText:{
          fontSize: 20,
        },
        inputView:{
            flexDirection : 'row',
            margin : 20,
        },
        inputBox:{
            width : 200,
            height  :40,
            borderWidth : 1.5,
            borderRightWidth : 0,
            fontSize : 20
        }
      });