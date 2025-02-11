import { useEffect, useState } from 'react';
import { View, FlatList, Modal, Alert, Text } from "react-native";
import Header from '@/src/components/Header';
import FrmBuy from '../screens/Form/buy';
import { ITBuy } from '@/src/constants/interface';
import { CardBuy } from '@/src/components/Card/buy';
import { useBuySupabase } from '@/src/database/useBuySupabase';
import HeaderScreen from '@/src/components/HeaderScreen';

export default function Buy() {
  const buyDatabase = useBuySupabase()
  const [nullBuy, setNullBuy] = useState<ITBuy>()
  const [buy, setBuy] = useState<ITBuy>()
  const [buys, setBuys] = useState<ITBuy[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  async function listBuys() {
    try {
      const response = await buyDatabase.list()
      if(response) {
        setBuys(response)
      }
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

      <HeaderScreen titleScreen='COMPRAS' titleButton='Nova' onPress={openModal} />
 
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
