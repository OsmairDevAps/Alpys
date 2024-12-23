import { Feather } from '@expo/vector-icons'
import { Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import { useState } from 'react';
import { dataBuy } from '@/src/constants/db';
import FrmBuy from '../screens/Form/buy';
import Header from '@/src/components/Header';

export default function Buy() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />

      <View className="flex flex-row justify-between items-center w-full px-4 h-10 mb-4">
        <Text className="text-xl font-bold">COMPRAS</Text>
        <TouchableOpacity onPress={openModal} className="flex flex-row justify-between items-center gap-2 bg-orange-500 p-1">
          <Feather name="plus-square" size={24} color="#ffffff" />
          <Text className="text-white">Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        style={{width: '100%', paddingLeft: 16, paddingRight: 16}}
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

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(!isModalOpen)
      }}>
        <FrmBuy closeModal={setIsModalOpen} />
      </Modal>
    </View>
  )
}
