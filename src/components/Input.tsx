import { View, Text, TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  label?: string;
  placeholder?: string;
}

export default function Input({ label, placeholder, ...rest }: Props) {
  return (
    <View className="flex w-full gap-2 my-2">
      {label && <Text className="text-orange-950 text-lg">{label}:</Text>}
      <TextInput 
        {...rest}
        placeholderTextColor='#a8a29e'
        className="w-full h-16 text-lg p-4 text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg"
        placeholder={placeholder}
      />
    </View>
  )
}