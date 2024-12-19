import { Feather } from '@expo/vector-icons'
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { IOrder } from "@/src/constants/interface";

type BuyProps = {
  closeModal: (value: boolean) => void;
  dataOrder: IOrder[]
}

export default function ListOrder({ closeModal, dataOrder }: BuyProps) {
  return (
    <View className="flex flex-1 mt-40 p-4 bg-orange-200">
      <View className="flex flex-row justify-between items-center w-[370] h-10 mb-4">
        <Text>Lista de Encomendas</Text>
        <TouchableOpacity onPress={() => closeModal(false)}>
          <Feather name="x-square" size={32} color="#ff0000" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={dataOrder}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => 
          <View className="mb-4">
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
              <Text className="text-lg font-bold">Preço:</Text>
              <Text className="text-lg">
                {Intl.NumberFormat(
                  'pt-BR', 
                  {style: 'currency', currency: 'BRL'}
                  ).format(item.price)}
              </Text>
            </View>
            <View className="flex flex-row gap-2">
              <Text className="text-lg font-bold">Entrega?</Text>
              <Text className="text-lg">{item.isdelivery ? 'Sim' : 'Não'}</Text>
            </View>
            <View className="flex flex-row gap-2">
              <Text className="text-lg font-bold">Taxa de Endereço:</Text>
              <Text className="text-lg">{item.deliveryfee}</Text>
            </View>
            <View className="flex flex-row gap-2">
              <Text className="text-lg font-bold">Endereço entrega:</Text>
              <Text className="text-lg">{item.address}</Text>
            </View>
            <View className="flex flex-row gap-2">
              <Text className="text-lg font-bold">Observação:</Text>
              <Text className="text-lg">{item.obs}</Text>
            </View>
          </View>
        }
      />
    </View>
  )
}
