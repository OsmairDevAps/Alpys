import { IProduct } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = {
  item: IProduct;
  onDelete: () => void;
  onUpdate: () => void;
}

export function CardProduct({item, onDelete, onUpdate}: Props) {
  return (
    <View className="flex flex-row justify-between items-center">
      
      <View className="w-80 border-dotted border-orange-50 border-[1px]">
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Categoria:</Text>
          <Text className="text-lg">{item.category}</Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Produto:</Text>
          <Text className="text-lg">{item.name}</Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Valor:</Text>
          <Text className="text-lg">
            {Intl.NumberFormat(
              'pt-BR', 
              {style: 'currency', currency: 'BRL'}
              ).format(item.price)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onUpdate} className="border-[1px] border-orange-300 p-2 rounded-lg">
        <Feather name="edit-2" size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete} className="border-[1px] border-orange-300 p-2 rounded-lg">
        <Feather name="trash-2" size={24} />
      </TouchableOpacity>

    </View>
  )
}