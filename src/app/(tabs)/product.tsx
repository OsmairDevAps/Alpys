import { useEffect, useState } from "react";
import { View, Modal, FlatList } from "react-native";
import { useProductSupabase } from "@/src/database/useProductSupabase";
import FrmProduct from "../screens/Form/product";
import Header from "@/src/components/Header";
import { IProduct } from "@/src/constants/interface";
import { CardProduct } from "@/src/components/Card/product";
import HeaderScreen from "@/src/components/HeaderScreen";

export default function Product() {
  const productDatabase = useProductSupabase()
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
      <HeaderScreen titleScreen="PRODUTOS" titleButton="Novo" onPress={openModal} />

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