import { View, Text, TextInput, TextInputProps } from 'react-native'

interface Props extends TextInputProps {
  label: string;
}

export default function Input({ label, ...rest }: Props) {
  return (
    <View className="flex w-full gap-2 my-2">
      <Text className="text-slate-100 text-lg">{label}:</Text>
      <TextInput 
        {...rest}
        placeholderTextColor='#969CB2'
        className="w-fit h-14 text-lg p-4 text-slate-300 bg-slate-50 border-2 border-slate-400 rounded-lg"
        placeholder="Quantidade"
      />
    </View>
  )
}