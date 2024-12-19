import { Feather } from '@expo/vector-icons'
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { ITSale } from "@/src/constants/interface";

type SaleProps = {
  closeModal: (value: boolean) => void;
  dataSale: ITSale[]
}

export default function ListSale({ closeModal, dataSale }: SaleProps) {
  return (
    <View className="flex flex-1 mt-40 p-4 bg-orange-50">
      <View className="flex flex-row justify-between items-center w-[370] h-10 mb-4">
        <Text>Lista de Vendas</Text>
        <TouchableOpacity onPress={() => closeModal(false)}>
          <Feather name="x-square" size={32} color="#ff0000" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={dataSale}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => 
          <View className={item.ispaid ? "pl-3 mb-2 bg-green-100":"pl-3 mb-2 bg-red-100"}>
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
              <Text className="text-lg font-bold">Data:</Text>
              <Text className="text-lg">{item.datetransaction}</Text>
            </View>
            <View className="flex flex-row gap-2">
              <Text className="text-lg font-bold">Pago?</Text>
              <Text className="text-lg">{item.ispaid ? 'Sim' : 'Não'}</Text>
            </View>
          </View>
        }
      />
    </View>
  )
}
