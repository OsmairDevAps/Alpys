import { ITBuy } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: ITBuy;
  onDelete: () => void;
  onUpdate: () => void;
}

export function CardBuy({ item, onDelete, onUpdate }: Props) {
  return (
    <View className="flex flex-row justify-between items-center">
      <View className="w-80 border-dotted border-orange-50 border-[1px]">
          <View className="flex flex-row gap-2">
            <Text className="text-lg font-bold">Local da compra:</Text>
            <Text className="text-lg">{item.place}</Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-lg font-bold">Tipo de produto:</Text>
            <Text className="text-lg">{item.kind}</Text>
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
            <Text className="text-lg font-bold">Valor:</Text>
            <Text className="text-lg">
              {Intl.NumberFormat(
                'pt-BR', 
                {style: 'currency', currency: 'BRL'}
                ).format(item.price)}
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-lg font-bold">Data:</Text>
            <Text className="text-lg">{item.datetransaction}</Text>
          </View>
      </View>

      <TouchableOpacity onPress={onUpdate}>
        <Feather name="edit-2" size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Feather name="trash-2" size={24} />
      </TouchableOpacity>

    </View>
  )
}