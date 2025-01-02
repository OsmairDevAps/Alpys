import { ITSale } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
  item: ITSale;
  onDelete: () => void;
  onUpdate: () => void;
}

export function CardSale({item, onDelete, onUpdate, ...rest}: Props) {
  return (
    <View className="flex flex-row justify-between items-center">
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
            <Text className="text-lg font-bold">Valor:</Text>
            <Text className="text-lg">
              {Intl.NumberFormat(
                'pt-BR', 
                {style: 'currency', currency: 'BRL'}
                ).format(item.price)}
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-lg font-bold">Pagamento confirmado?</Text>
            <Text className="text-lg">{item.ispaid ? 'Sim' : 'Não'}</Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-lg font-bold">Data:</Text>
            <Text className="text-lg">{item.datetransaction}</Text>
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