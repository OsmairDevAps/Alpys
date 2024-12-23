import { ButtonProps, Pressable, Text, TouchableOpacity } from "react-native";

interface Props extends ButtonProps {
  title: string;
  type?: string;
}

export default function Button({ title, type, ...rest }: Props) {
  return (
    <TouchableOpacity 
      className={
        type==='Close' ? "flex justify-center items-center w-full h-14 my-2 bg-red-500 rounded":
                    "flex justify-center items-center w-full h-14 my-2 bg-orange-500 rounded"}
      {...rest}
    >
      <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  )
}