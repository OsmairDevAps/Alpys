import { View, Text, TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  label?: string;
  placeholder?: string;
}

export default function Input({ label, placeholder, ...rest }: Props) {
  return (
    <View className="flex w-full gap-2 my-2">
      {label && <Text className="text-slate-100 text-lg">{label}:</Text>}
      <TextInput 
        {...rest}
        placeholderTextColor='#969CB2'
        className="w-full h-14 text-lg p-4 text-orange-950 bg-orange-50 border-[1px] border-orange-400 rounded-lg"
        placeholder={placeholder}
      />
    </View>
  )
}