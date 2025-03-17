import { ButtonProps, Text, TouchableOpacity } from "react-native";

interface Props extends ButtonProps {
  title: string;
  type?: string;
  fit?: boolean;
}

export default function Button({ title, type, fit, ...rest }: Props) {
  let color = 'flex justify-center items-center h-14 my-2 rounded w-full bg-orange-500'
  const colorMini   = "flex flex-row justify-center items-center w-full h-14 bg-orange-500"
  const colorClose   = "flex justify-center items-center h-14 my-2 rounded w-full bg-red-500"
  const colorSubmit  = "flex justify-center items-center h-14 my-2 rounded w-full bg-orange-500"
  const colorEvently = "flex justify-center items-center h-14 my-2 rounded px-2 bg-green-500"
  const colorEventlyFit = "flex justify-center items-center h-14 my-2 rounded w-full px-2 bg-green-500"
  if (type === 'Mini') {
    color = colorMini
  }
  if (type === 'Close') {
    color = colorClose
  }
  if (type === 'Submit') {
    color = colorSubmit
  }
  if (type === 'Evently') {
    if (fit) {
      color = colorEventlyFit
    } else {
      color = colorEvently
    }
  }

  return (
    <TouchableOpacity className={color} {...rest}>
      <Text className="text-white text-lg">{title}</Text>
    </TouchableOpacity>
  )
}