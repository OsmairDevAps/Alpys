import { Text, View, Image } from "react-native";

export default function Header() {
  const imgLogo = '../assets/images/logo_alpys.png'

  return (
    <View className='flex justify-center items-center pt-2 bg-orange-500 w-full h-28'>
      <Image source={require(imgLogo)} />
    </View>
  )
}