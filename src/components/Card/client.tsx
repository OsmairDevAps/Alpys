import { IClient } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: IClient;
  onDelete: () => void;
  color?:string;
}

export function  CardClient({ item, onDelete, color }: Props) {
  return (
    <View className={`flex flex-row justify-between items-center h-14 px-2 ${color}`}>
      <View className="w-80 border-dotted border-orange-50 border-[1px]">
        <View className="flex flex-row gap-2">
          <Text className="text-lg">{item.name}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Feather name="trash-2" size={24} />
      </TouchableOpacity>
    </View>
  )
}