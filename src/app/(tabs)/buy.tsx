import { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, Alert } from "react-native";
import { Feather } from '@expo/vector-icons'
import Header from '@/src/components/Header';
import FrmBuy from '../screens/Form/buy';
import { ITBuy } from '@/src/constants/interface';
import { useBuyDatabase } from '@/src/database/useBuyDatabase';
import { CardBuy } from '@/src/components/Card/buy';

export default function Buy() {
  const buyDatabase = useBuyDatabase()
  const [nullBuy, setNullBuy] = useState<ITBuy>()
  const [buy, setBuy] = useState<ITBuy>()
  const [buys, setBuys] = useState<ITBuy[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  async function listBuys() {
    try {
      const response = await buyDatabase.list()
      setBuys(response)
    } catch (error) {
      console.log('Erro ao listar: ', error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await buyDatabase.remove(id)
      Alert.alert('Compra excluída com sucesso!')
      listBuys()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(buy: ITBuy) {
    setBuy(buy)
    setIsModalOpen(true)
  }

  function openModal() {
    setBuy(nullBuy)
    setIsModalOpen(true)
  }

  useEffect(() => {
    listBuys()
  }, [])

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
        data={buys}
        contentContainerStyle={{ gap: 16 }}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => 
          <CardBuy 
            item={item}
            onUpdate={() => handleUpdate(item)}
            onDelete={() => handleDelete(item.id)}
          />
        }
      />

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(!isModalOpen)
      }}>
        <FrmBuy 
          closeModal={setIsModalOpen} 
          listBuy={listBuys()} 
          buy={buy}
        />
      </Modal>
    </View>
  )
}
