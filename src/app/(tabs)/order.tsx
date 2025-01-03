import { useState } from "react";
import { Text, View, Modal, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import FrmOrder from "../screens/Form/order";
import Header from "@/src/components/Header";
import { useOrderDatabase } from "@/src/database/useOrderDatabase";
import { IOrder } from "@/src/constants/interface";
import { CardOrder } from "@/src/components/Card/order";

export default function Order() {
  const orderDatabase = useOrderDatabase()
  const [order, setOrder] = useState<IOrder>()
  const [nullOrder, setNullOrder] = useState<IOrder>()
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function list() {
    try {
      const response = await orderDatabase.list()
      setOrders(response)
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
      
      <View className="flex flex-row justify-between items-center w-full px-4 h-10 mb-4">
        <Text className="text-xl font-bold">ENCOMENDAS</Text>
        <TouchableOpacity onPress={openModal} className="flex flex-row justify-between items-center gap-2 bg-orange-500 p-1">
          <Feather name="plus-square" size={24} color="#ffffff" />
          <Text className="text-white">Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        style={{width: '100%'}}
        data={orders}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ gap: 16 }}
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