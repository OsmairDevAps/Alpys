import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { IOrder } from "@/src/constants/interface";

type Props = TouchableOpacityProps & {
  item: IOrder;
  onDelete: () => void;
  onUpdate: () => void;
}

export function CardOrder({item, onDelete, onUpdate, ...rest}: Props) {
  return (
    <View className="flex flex-row justify-between items-center px-4 bg-orange-100">
      <TouchableOpacity className="w-80 border-dotted border-orange-50 border-[1px]" {...rest}>
      <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Cliente:</Text>
          <Text className="text-lg">{item.client_name}</Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Produto:</Text>
          <Text className="text-lg">{item.product_name}</Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Quantidade:</Text>
          <Text className="text-lg">{item.amount}</Text>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-lg font-bold">Data de entrega:</Text>
          <Text className="text-lg">
            {Intl.DateTimeFormat(
              'pt-BR', {
                day: "2-digit",
                month: '2-digit',
                year: 'numeric'
              }).format(item.order_data)}
          </Text>
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