import { useState, useEffect } from "react";
import { Text, View, Modal, FlatList, TouchableOpacity, Alert } from "react-native";
import Header from "@/src/components/Header";
import { Feather } from "@expo/vector-icons";
import FrmSale from "../screens/Form/sale";
import { CardSale } from "@/src/components/Card/sale";
import { ITSale } from "@/src/constants/interface";
import { useSaleDatabase } from "@/src/database/useSaleDatabase";

export default function Sales() {
  const saleDatabase = useSaleDatabase()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sales, setSales] = useState<ITSale[]>([])
  const [nullSale, setNullSale] = useState<ITSale>()
  const [sale, setSale] = useState<ITSale>()
  
  async function listSales() {
    try {
      const response = await saleDatabase.list()
      setSales(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id: number) {
    try {
      await saleDatabase.remove(id)
      Alert.alert('Venda excluída com sucesso!')
      listSales()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(sale: ITSale) {
    setSale(sale)
    setIsModalOpen(true)
  }

  function openModal() {
    setSale(nullSale)
    setIsModalOpen(true)
  }

  useEffect(() => {
    listSales()
  },[])

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />

      <View className="flex flex-row justify-between items-center w-full px-4 h-10 mb-4">
        <Text className="text-xl font-bold">VENDAS</Text>
        <TouchableOpacity onPress={openModal} className="flex flex-row justify-between items-center gap-2 bg-orange-500 p-1">
          <Feather name="plus-square" size={24} color="#ffffff" />
          <Text className="text-white">Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        style={{width: '100%', paddingLeft: 16, paddingRight: 16}}
        data={sales}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => 
          <CardSale 
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
        <FrmSale 
          closeModal={setIsModalOpen} 
          listSales={listSales()} 
          sale={sale} 
        />
      </Modal>

    </View>
  )
}