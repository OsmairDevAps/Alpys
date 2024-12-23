import { useState } from "react";
import { Text, View, Modal, TouchableOpacity, FlatList } from "react-native";
import { dataOrder } from "@/src/constants/db";
import { Feather } from "@expo/vector-icons";
import FrmOrder from "../screens/Form/order";
import Header from "@/src/components/Header";

export default function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />
      
      <View className="flex flex-row justify-between items-center w-full px-4 h-10 mb-4">
        <Text className="text-xl font-bold">ENCOMENDAS</Text>
        <TouchableOpacity onPress={openModal} className="flex flex-row justify-between items-center gap-2 bg-orange-500 p-1">
          <Feather name="plus-square" size={24} color="#ffffff" />
          <Text className="text-white">Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        style={{width: '100%', paddingLeft: 16, paddingRight: 16}}
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
      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(!isModalOpen)
      }}>
        <FrmOrder closeModal={setIsModalOpen} />
      </Modal>
    </View>
    )
}