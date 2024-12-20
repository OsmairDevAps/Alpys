import { ButtonProps, Pressable, Text, TouchableOpacity } from "react-native";

interface Props extends ButtonProps {
  title: string;
}

export default function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity 
      className="flex justify-center items-center w-fit h-14 my-2 bg-orange-500 rounded"
      {...rest}
    >
      <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  )
}