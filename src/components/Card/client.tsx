import { memo } from "react";
import { IClient } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: IClient;
  onDelete: () => void;
}

export function  CardClient({ item, onDelete }: Props) {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="w-80 border-dotted border-orange-50 border-[1px]">
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Nome:</Text>
          <Text className="text-lg">{item.name}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onDelete} className="border-[1px] border-orange-300 p-2 rounded-lg">
        <Feather name="trash-2" size={24} />
      </TouchableOpacity>
    </View>
  )
}