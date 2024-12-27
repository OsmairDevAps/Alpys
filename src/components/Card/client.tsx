import { IClient } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  item: IClient;
  onDelete: () => void;
  onUpdate: () => void;
}

export function CardClient({item, onDelete, onUpdate, ...rest}: Props) {
  return (
    <View className="flex flex-row justify-between items-center">
      
      <TouchableOpacity className="w-80 border-dotted border-orange-50 border-[1px]" {...rest}>
          <View className="flex flex-row gap-2">
            <Text className="text-lg font-bold">Cliente:</Text>
            <Text className="text-lg">{item.name}</Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onUpdate}>
        <Feather name="edit-2" size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Feather name="trash-2" size={24} />
      </TouchableOpacity>

    </View>
  )
}