import { useEffect, useState } from "react";
import { Text, View, Modal, FlatList, TouchableOpacity } from "react-native";
import { useProductDatabase } from "@/src/database/useProductDatabase";
import FrmProduct from "../screens/Form/product";
import Header from "@/src/components/Header";
import { Feather } from "@expo/vector-icons";
import { IProduct } from "@/src/constants/interface";
import { CardProduct } from "@/src/components/Card/product";

export default function Product() {
  const productDatabase = useProductDatabase()
  const [product, seProduct] = useState<IProduct>()
  const [nullProduct, seNullProduct] = useState<IProduct>()
  const [products, seProducts] = useState<IProduct[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function list() {
    try {
      const response = await productDatabase.list()
      if(response) {
        seProducts(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  async function handleDelete(id: number) {
    try {
      await productDatabase.remove(id)
      list()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(prod: IProduct) {
    seProduct(prod)
    setIsModalOpen(true)
  }

  function openModal() {
    seProduct(nullProduct)
    setIsModalOpen(true)
  }

  useEffect(() => {
    list()
  },[])

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
        data={products}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => 
          <CardProduct 
            item={item} 
            onDelete={() => handleDelete(item.id)} 
            onUpdate={() => handleUpdate(item)}
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
        <FrmProduct 
          closeModal={setIsModalOpen} 
          product={product} 
          listProducts={list()} 
        />
      </Modal>

    </View>
  )
}