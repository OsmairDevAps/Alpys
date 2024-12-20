import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Modal, Switch } from "react-native";
import ListOrder from "../screens/listorder";
import { dataOrder, LProducts } from "@/src/constants/db";
import { SelectList } from "react-native-dropdown-select-list";
import { MaskedTextInput } from 'react-native-mask-text'

export default function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clientName, setClientName] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isDelivery, setIsDelivery] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState('')
  const [address, setAddress] = useState('')
  const [obs, setObs] = useState('')
  const [totPedido, setTotPedido] = useState(0)

  function calculaTotal() {
    isDelivery ? setTotPedido(Number(price) + Number(deliveryFee)) : setTotPedido(Number(price))
  }

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

      <View className="px-6 w-full">
        <Input 
          placeholder="Cliente"
          keyboardType="default"
          onChangeText={setClientName}
          value={clientName}
        />
        <SelectList
          placeholder='Tipo de Produto'
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
        <MaskedTextInput
          type='currency'
          className="w-full h-14 text-lg p-4 text-orange-950 bg-orange-50 border-[1px] border-orange-400 rounded-lg"
          options={{
            prefix: '',
            precision: 2,
            decimalSeparator: '.',
            groupSeparator: ',',
          }}
          placeholder='Preço'
          keyboardType='numeric'
          onChangeText={(price, rawText) => {
            setPrice(price)
          }}
        />
        <View className="flex flex-row gap-4 justify-normal items-center h-16">
          <Text className="text-orange-100">Para entrega?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#dde6f5'}}
            thumbColor={isDelivery ? '#ffa726' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsDelivery}
            value={isDelivery}
          />
          <Text className="text-orange-100">{isDelivery ? 'Sim' : 'Não'}</Text>
        </View>
        <MaskedTextInput
          type='currency'
          className="w-full h-14 text-lg p-4 text-orange-950 bg-orange-50 border-[1px] border-orange-400 rounded-lg"
          options={{
            prefix: '',
            precision: 2,
            decimalSeparator: '.',
            groupSeparator: ',',
          }}
          placeholder='0.00'
          keyboardType='numeric'
          onChangeText={(deliveryFee, rawText) => {
            setDeliveryFee(deliveryFee)
          }}
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
        <Text className="text-orange-100">
          VALOR TOTAL: {Intl
            .NumberFormat('pt-BR', 
              {style: 'currency', currency: 'BRL' })
            .format(totPedido)}
        </Text>
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