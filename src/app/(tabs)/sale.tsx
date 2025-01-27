import { useState, useEffect } from "react";
import { View, Modal, FlatList, Alert } from "react-native";
import Header from "@/src/components/Header";
import FrmSale from "../screens/Form/sale";
import { CardSale } from "@/src/components/Card/sale";
import { ITSale } from "@/src/constants/interface";
import { useSaleSupabase } from "@/src/database/useSaleSupabase";
import HeaderScreen from "@/src/components/HeaderScreen";

export default function Sales() {
  const saleDatabase = useSaleSupabase()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sales, setSales] = useState<ITSale[]>([])
  const [nullSale, setNullSale] = useState<ITSale>()
  const [sale, setSale] = useState<ITSale>()
  
  async function listSales() {
    try {
      const response = await saleDatabase.list()
      if(response){
        setSales(response)
      }
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
      <HeaderScreen titleScreen="VENDAS" titleButton="Nova" onPress={openModal} />

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