import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import { useState } from "react";
import { Pressable, Text, View, Modal } from "react-native";
import ListOrder from "../screens/listorder";
import { dataOrder } from "@/src/constants/db";

export default function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clientName, setClientName] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isDelivery, setIsDelivery] = useState('')
  const [deliveryFee, setDeliveryFee] = useState('')
  const [address, setAddress] = useState('')
  const [obs, setObs] = useState('')

  function handleSave() {
    const data = {
      client_name: clientName,
      product_name: productName,
      amount: amount,
      price: price,
      isdelivery: isDelivery,
      address: address,
      obs: obs
    }
  }

  function openModal() {
    setIsModalOpen(true)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-950'>
      <Header />

      <View className="flex flex-row w-96 h-14 justify-between items-center">
        <Text className="text-white text-xl">Encomendas</Text>
        <Pressable onPress={openModal}>
          <Text className="text-white text-xl">Listar</Text>
        </Pressable>
      </View>

      <View className="px-6">
        <Input 
          placeholder="Cliente"
          keyboardType="default"
          onChangeText={setClientName}
          value={clientName}
        />
        <Input 
          placeholder="Produto"
          keyboardType="default"
          onChangeText={setProductName}
          value={productName}
        />
        <Input 
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
        />
        <Input 
          placeholder="Preço"
          keyboardType="numeric"
          onChangeText={setPrice}
          value={price}
        />
        <Input 
          placeholder="Para entrega?"
          keyboardType="default"
          onChangeText={setIsDelivery}
          value={isDelivery}
        />
        <Input 
          placeholder="Taxa de entrega"
          keyboardType="numeric"
          onChangeText={setDeliveryFee}
          value={deliveryFee}
        />
        <Input 
          placeholder="Endereço"
          keyboardType="default"
          onChangeText={setAddress}
          value={address}
        />
        <Input 
          placeholder="Observação"
          keyboardType="default"
          onChangeText={setObs}
          value={obs}
        />

        <Button title="Salvar" onPress={handleSave} />
      </View>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
           setIsModalOpen(!isModalOpen)
      }}>
        <ListOrder closeModal={setIsModalOpen} dataOrder={dataOrder} />
      </Modal>
      
    </View>
  )
}