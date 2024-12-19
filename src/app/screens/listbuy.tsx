import { Feather } from '@expo/vector-icons'
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { ITBuy } from "@/src/constants/interface";
import { useState } from 'react';

type BuyProps = {
  closeModal: (value: boolean) => void;
  dataBuy: ITBuy[]
}

export default function ListBuy({ closeModal, dataBuy }: BuyProps) {
  const [itemVisible, setItemVisible] = useState(false)
  return (
    <View className="flex flex-1 mt-40 p-4 bg-orange-200">
      <View className="flex flex-row justify-between items-center w-[370] h-10 mb-4">
        <Text>Lista de Compras</Text>
        <TouchableOpacity onPress={() => closeModal(false)}>
          <Feather name="x-square" size={32} color="#ff0000" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={dataBuy}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => 
          <View className="mb-4">
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
          </View>
        }
      />
    </View>
  )
}
