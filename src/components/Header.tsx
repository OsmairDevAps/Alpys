import { Text, View } from "react-native";
import { Image } from 'expo-image';

export default function Header() {
  const imgLogo = '../assets/images/alpys.png'
  return (
    <View className='flex justify-center items-center pt-4 bg-orange-100 w-full h-24'>
      <Image
        source={require(imgLogo)}
        contentFit="cover"
        transition={1000}
      />
    </View>
  )
}