import { useState } from "react";
import { Text, View, Modal, Pressable } from "react-native";
import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import ListBuy from "../screens/listbuy";
import { SelectList } from 'react-native-dropdown-select-list';
import { dataBuy, LKind } from "@/src/constants/db";

export default function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [place, setPlace] = useState('')
  const [kind, setKind] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [stockId, setStockId] = useState(0)
  
  function openModal() {
    setIsModalOpen(true)
  }

  function handleSave() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const data = {
      modality: 'buy',
      place: place,
      kind: kind,
      productName: productName,
      amount: amount,
      price: price,
      dateTransaction: formattedDate,
      isPaid: isPaid
    }
    console.log(data)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-950'>
      <Header />
      
      <View className="flex flex-row w-96 h-14 justify-between items-center">
        <Text className="text-white text-xl">Compras</Text>
        <Pressable onPress={openModal}>
          <Text className="text-white text-xl">Listar</Text>
        </Pressable>
      </View>

      <View className="px-6 w-full">
        <Input 
          placeholder="Local da compra"
          keyboardType="default"
          onChangeText={setPlace}
          value={place}
        />

        <SelectList
          placeholder='Tipo de Produto'
          boxStyles={{ backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#eaeaea' }}
          setSelected={(val: string) => setKind(val)}
          data={LKind}
          save="key"
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
          placeholder="Valor"
          keyboardType="numeric"
          onChangeText={setPrice}
          value={price}
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
        <ListBuy closeModal={setIsModalOpen} dataBuy={dataBuy} />
      </Modal>

    </View>
  )
}