import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

type Props= {
  titleScreen: string;
  titleButton: string;
  hasFilter?: boolean;
  onPress: () => void;
  onPressFilter?: () => void;
}
export default function HeaderScreen({onPress, onPressFilter, titleScreen, titleButton, hasFilter}: Props) {

  return (
    <View className="flex flex-row justify-between items-center w-full px-4 h-12 mb-4 bg-orange-900">
    <Text className="text-xl text-white font-bold">{titleScreen}</Text>
    <View className='flex flex-row gap-2'>
      { hasFilter && 
        <TouchableOpacity onPress={onPressFilter} className="flex flex-row justify-between items-center gap-2 bg-orange-600 border-orange-50 border-2 rounded px-4 py-1">
          <Feather name="sliders" size={24} color="#ffffff" />
          <Text className="text-white font-semibold">Débitos</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={onPress} className="flex flex-row justify-between items-center gap-2 bg-orange-600 border-orange-50 border-2 rounded px-4 py-1">
        <Feather name="plus-square" size={24} color="#ffffff" />
        <Text className="text-white font-semibold">{titleButton}</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}