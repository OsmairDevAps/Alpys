import Header from "@/src/components/Header";
import { Text, View } from "react-native";

export default function Transaction() {
  return (
    <View className='flex flex-1 items-center justify-start bg-orange-950'>
      <Header />
      <Text className="text-white text-2xl">Transactions</Text>
    </View>
  )
}