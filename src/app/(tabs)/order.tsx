import { useState } from "react";
import { View, Modal, FlatList } from "react-native";
import FrmOrder from "../screens/Form/order";
import Header from "@/src/components/Header";
import { IOrder } from "@/src/constants/interface";
import { CardOrder } from "@/src/components/Card/order";
import { useOrderSupabase } from "@/src/database/useOrderSupabase";
import HeaderScreen from "@/src/components/HeaderScreen";

export default function Order() {
  const orderDatabase = useOrderSupabase()
  const [order, setOrder] = useState<IOrder>()
  const [nullOrder, setNullOrder] = useState<IOrder>()
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function list() {
    try {
      const response = await orderDatabase.list()
      if(response) {
        setOrders(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await orderDatabase.remove(id)
      list()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(item: IOrder) {
    setOrder(item)
    setIsModalOpen(true)
  }

  function openModal() {
    setOrder(nullOrder)
    setIsModalOpen(true)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />
      
      <HeaderScreen titleScreen="ENCOMENDAS" titleButton="Nova" onPress={openModal} />

      <FlatList 
        style={{width: '100%'}}
        data={orders}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => 
          <CardOrder 
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
        <FrmOrder 
          closeModal={setIsModalOpen} 
          listOrder={list()}
          order={order}
        />
      </Modal>
    </View>
    )
}