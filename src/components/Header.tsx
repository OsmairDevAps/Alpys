import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NetInfo from '@react-native-community/netinfo';

export default function Header() {
  const imgLogo = '../assets/images/logo_alpys.png'
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(() => {
      setIsConnected(isConnected);
    });
    return () => unsubscribe();
  }, []);

  function handleSync() {
    isConnected === null
    ? console.log('Verificando conexão...')
    : isConnected
    ? console.log('Online')
    : console.log('Offline')
  }

  return (
    <View className='flex flex-row justify-between items-center pl-32 pr-2 bg-orange-500 w-full h-28'>
      <Image source={require(imgLogo)} className="w-44 h-20" />
      <TouchableOpacity onPress={handleSync} className="p-2 w-16 h-16 flex justify-center items-center">
        <MaterialIcons name="sync" size={36} color="#ffffff" />
      </TouchableOpacity>
    </View>
  )
}