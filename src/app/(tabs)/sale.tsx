import { useState } from "react";
import { Pressable, Switch, Text, View, Modal } from "react-native";
import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import ListSale from "../screens/listsale";
import { SelectList } from 'react-native-dropdown-select-list';
import { dataSale, LClients, LProducts } from "@/src/constants/db";

export default function Sales() {
  const [productName, setProductName] = useState('')
  const [clientName, setClientName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [stockId, setStockId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
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
      modality: 'sale',
      clientName: clientName,
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
        <Text className="text-white text-xl">Vendas</Text>
        <Pressable onPress={openModal}>
          <Text className="text-white text-xl">Listar</Text>
        </Pressable>
      </View>

      <View className="px-6 w-full">
        <SelectList
          placeholder='Nome do Cliente'
          boxStyles={{ backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#eaeaea' }}
          setSelected={(val: string) => setClientName(val)}
          data={LClients}
          save="key"
        />

        <SelectList
          placeholder='Produto'
          boxStyles={{ backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#eaeaea' }}
          setSelected={(val: string) => setProductName(val)}
          data={LProducts}
          save="key"
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

        <View className="flex flex-row gap-4 justify-normal items-center h-24">
          <Text className="text-orange-100">Produto pago?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#dde6f5'}}
            thumbColor={isPaid ? '#ffa726' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsPaid}
            value={isPaid}
          />
          <Text className="text-orange-100">{isPaid ? 'Sim' : 'Não'}</Text>
        </View>

        <Button title="Salvar" onPress={handleSave} />
      </View>
 
      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
           setIsModalOpen(!isModalOpen)
      }}>
        <ListSale closeModal={setIsModalOpen} dataSale={dataSale} />
      </Modal>

    </View>
  )
}