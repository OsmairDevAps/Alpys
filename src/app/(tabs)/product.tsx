import { useState } from "react";
import { Text, View, Modal, FlatList, TouchableOpacity } from "react-native";
import Header from "@/src/components/Header";
import { dataProduct } from "@/src/constants/db";
import { Feather } from "@expo/vector-icons";
import FrmSale from "../screens/Form/sale";
import FrmProduct from "../screens/Form/product";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />

      <View className="flex flex-row justify-between items-center w-full px-4 h-10 mb-4">
        <Text className="text-xl font-bold">PRODUTOS</Text>
        <TouchableOpacity onPress={openModal} className="flex flex-row justify-between items-center gap-2 bg-orange-500 p-1">
          <Feather name="plus-square" size={24} color="#ffffff" />
          <Text className="text-white">Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        style={{width: '100%', paddingLeft: 16, paddingRight: 16}}
        data={dataProduct}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => 
          <View className="mb-4">
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
        }
      />
 
      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
           setIsModalOpen(!isModalOpen)
      }}>
        <FrmProduct closeModal={setIsModalOpen} />
      </Modal>

    </View>
  )
}