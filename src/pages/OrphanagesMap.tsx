import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import elipse from '../images/elipse.png'
import {Feather} from '@expo/vector-icons'
// import {useFonts} from 'expo-font'
// import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../services/api';


export default function OrphanagesMap() {

    // const [fontsLoaded] = useFonts({
    //     Nunito_600SemiBold,
    //     Nunito_700Bold,
    //     Nunito_800ExtraBold
    //   })
    
    interface Orphanage {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
    }
        const [orphanages, setOrphanages] = useState<Orphanage[]>([])

        useFocusEffect( () => {
            api.get('orphanages').then(response => {
                setOrphanages(response.data);
            })
        })
      const navigation = useNavigation()
      

      function handleNavigateToOrphanageDetails(id: number){
          navigation.navigate('OrphanageDetails', {id})
      }

      function handleNavigateToSelectMapPosition(){
        navigation.navigate('SelectMapPosition')
    }

    //   if(!fontsLoaded){
    //     return null;
    //   }
    


    return (
        <View style={styles.container}>
      
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
        latitude:-7.1129317,
        longitude:-34.831875,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008}}
        >
          {orphanages.map(orphanage => {
              return (
                <Marker 
                key={orphanage.id}
                icon={elipse}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude
                }}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8
                }}
                 >
                  <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                   <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}>{orphanage.name}</Text>
                    </View> 
                  </Callout>
                </Marker>
              )
          })}
        </MapView>
            
        <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length}</Text>
          <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateToSelectMapPosition}>
            <Feather name={"plus"} size={20} color="#FFF"/>
          </TouchableOpacity>
        </View>
      
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32, 
      fontSize: 24,
  
      elevation: 3,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  
    },
    footerText: {
    //   fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    }
    ,
    calloutContainer: {
      width: 160 ,
      height:46,
      paddingHorizontal: 16,
      backgroundColor: "#FF0",
      borderRadius: 16,
      justifyContent: 'center'
    },
  
    calloutText: {
      color: '#0089a5',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6'
    }
  
  });
  