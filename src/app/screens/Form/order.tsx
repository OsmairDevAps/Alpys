import { useState, useEffect } from "react";
import { Text, View, Switch, KeyboardAvoidingView, Platform, Keyboard, Modal } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { LClients, LProducts } from "@/src/constants/db";
import { SelectList } from "react-native-dropdown-select-list";
import { MaskedTextInput } from 'react-native-mask-text'
import { ISelectProps } from "@/src/constants/interface";
import { useOrderDatabase } from "@/src/database/useOrderDatabase";
import { useClientDatabase } from "@/src/database/useClientDatabase";
import { useProductDatabase } from "@/src/database/useProductDatabase";
import FrmClient from "./client";

type OrderProps = {
  closeModal: (value: boolean) => void;
  listOrder: Promise<void>;
}

export default function FrmOrder({closeModal, listOrder}:OrderProps) {
  const [selectClients, setSelectClients] = useState<ISelectProps[]>([{ key: '', value: '' }])
  const [selectProducts, setSelectProducts] = useState<ISelectProps[]>([{ key: '', value: '' }])
  const [isModalClientOpen, setIsModalClientOpen] = useState(false)
  const [clientName, setClientName] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isDelivery, setIsDelivery] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState('')
  const [address, setAddress] = useState('')
  const [obs, setObs] = useState('')
  const [totPedido, setTotPedido] = useState(0)
  const clientDatabase = useClientDatabase()
  const productDatabase = useProductDatabase()
  const orderDatabase = useOrderDatabase()

  async function listClients() {
    try {
      const response = await clientDatabase.list()
      if(response) {
        let newArray: ISelectProps[] = response.map(cli => {
          return { key: String(cli.id), value: String(cli.name) }
        })
        setSelectClients(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function listProducts() {
    try {
      const response = await productDatabase.list()
      if(response) {
        let newArray: ISelectProps[] = response.map(pro => {
          return { key: String(pro.id), value: String(pro.name) }
        })
        setSelectProducts(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    try {
      await orderDatabase.create({
        client_name: clientName, 
        product_name: productName, 
        amount: Number(amount), 
        price: Number(price), 
        isdelivery: isDelivery, 
        deliveryfee: Number(deliveryFee), 
        address: address, 
        obs: obs  
      })
      setAmount('')
      setPrice('')
      setIsDelivery(false)
      setDeliveryFee('')
      setAddress('')
      setObs('')
      setTotPedido(0)
      await listOrder
      closeModal(false)
    } catch (error) {
      console.log(error)      
    }
  }

  function handleClose() {
    closeModal(false)
  }
  
  function openModalClient() {
    setIsModalClientOpen(true)
  }

  useEffect(() => {
    listClients()
    listProducts()
  },[])

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex-1 items-center justify-start bg-orange-50 px-4 mt-28'>
        <View className="items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE ENCOMENDAS</Text>
        </View>

        <View className="flex-row justify-between w-full gap-4">
          <SelectList
            placeholder='Nome do Cliente'
            inputStyles={{ color: '#431407'}}
            boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', borderColor: '#f97316', borderWidth: 1, marginBottom: 8, marginTop: 8 }}
            dropdownStyles={{ backgroundColor: '#fdf7e5' }}
            setSelected={(val: string) => setClientName(val)}
            data={selectClients}
            save="key"
          />
          <Button title="+ Cliente" type="Evently" onPress={openModalClient} />
        </View>
        <SelectList
          placeholder='Tipo de Produto'
          inputStyles={{ color: '#431407'}}
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', borderColor: '#f97316', borderWidth: 1, marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#fdf7e5' }}
          setSelected={(val: string) => setProductName(val)}
          data={selectProducts}
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
          style={{
            width: '100%',
            color: '#4b2400', 
            backgroundColor: '#fff7ed',
            borderWidth: 1,
            borderColor: '#f97316',
            borderRadius: 8, 
            height: 50, 
            paddingLeft: 10, 
            placeHoldelColor: '#a8a29e', 
            marginTop: 8
          }}
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
        <View className="flex flex-row w-full gap-4 justify-normal items-center h-16">
          <Text className="text-orange-950">Para entrega?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#dde6f5'}}
            thumbColor={isDelivery ? '#ffa726' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsDelivery}
            value={isDelivery}
          />
          <Text className="text-orange-950">{isDelivery ? 'Sim' : 'Não'}</Text>
        </View>
        <MaskedTextInput
          type='currency'
          style={{
            width: '100%',
            color: '#4b2400', 
            backgroundColor: '#fff7ed', 
            borderWidth: 1,
            borderColor: '#f97316',
            borderRadius: 8, 
            height: 50, 
            paddingLeft: 10, 
            placeHoldelColor: '#a8a29e', 
            marginBottom: 8
          }}
          options={{
            prefix: '',
            precision: 2,
            decimalSeparator: '.',
            groupSeparator: ',',
          }}
          placeholder='Taxa de entrega'
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
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalClientOpen}
        onRequestClose={() => {
           setIsModalClientOpen(!isModalClientOpen)
      }}>
        <FrmClient closeModal={setIsModalClientOpen} listSelect={listClients()} />
      </Modal>
    </KeyboardAvoidingView>
    )
}