import { useState, useEffect } from "react";
import { Text, View, Switch, KeyboardAvoidingView, Platform, Keyboard, Modal, TouchableOpacity } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { SelectList } from "react-native-dropdown-select-list";
import { MaskedTextInput } from 'react-native-mask-text'
import { IOrder, ISelectProps } from "@/src/constants/interface";
import { useOrderDatabase } from "@/src/database/useOrderDatabase";
import { useClientDatabase } from "@/src/database/useClientDatabase";
import { useProductDatabase } from "@/src/database/useProductDatabase";
import FrmClient from "./client";

type OrderProps = {
  closeModal: (value: boolean) => void;
  listOrder: Promise<void>;
  order?: IOrder;
}

type SelectProductProps = {
  key: string;
  value: string;
  price: number;
}

export default function FrmOrder({closeModal, listOrder, order}:OrderProps) {
  const [selectClients, setSelectClients] = useState<ISelectProps[]>([{ key: '', value: '' }])
  const [selectProducts, setSelectProducts] = useState<SelectProductProps[]>([{ key: '', value: '', price: 0 }])
  const [isModalClientOpen, setIsModalClientOpen] = useState(false)
  const [id, setId] = useState(0)
  const [clientName, setClientName] = useState('')
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [price, setPrice] = useState(0)
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
        let newArray: SelectProductProps[] = response.map(pro => {
          return { key: String(pro.id), value: String(pro.name), price: pro.price }
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
        price: price, 
        isdelivery: isDelivery, 
        deliveryfee: Number(deliveryFee), 
        address: address, 
        obs: obs  
      })
      setAmount('')
      setPrice(0)
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

  function SetValuePrice() {
    if (Number(productId) > 0 ) {
      const prod = selectProducts.find(sp => sp.key === productId)
      let value
      let total=0
      if (prod) {
        value = prod.price
        setProductName(prod.value)
      }
      if (Number(amount) > 0) {
        total = total + (Number(amount) * Number(value))
      }
      if (Number(deliveryFee) > 0) {
        total = total + Number(deliveryFee)
      }
      setPrice(total)
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
    if(order) {
      setId(order.id)
      setAmount(String(order.amount))
      setPrice(order.price)
      setIsDelivery(order.isdelivery)
      setDeliveryFee(String(order.deliveryfee))
      setAddress(order.address)
      setObs(order.obs)
    }
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

        <Input 
          placeholder="Cliente"
          keyboardType="default"
          onChangeText={setClientName}
          value={clientName}
        />
        
        <SelectList
          placeholder='Produto'
          inputStyles={{ color: '#431407'}}
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', borderColor: '#f97316', borderWidth: 1, marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#fdf7e5' }}
          setSelected={(val: string) => setProductId(val)}
          data={selectProducts}
          save="key"
        />
        
        <Input 
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
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

        <View className="flex flex-row justify-start items-center w-full h-12 gap-2">
          <Text>Valor total:</Text>
          <Text>{price}</Text>
          <TouchableOpacity className="ml-10 px-4 py-1 border-[1px] border-orange-200 rounded-lg bg-orange-100" onPress={SetValuePrice}>
            <Text>Atualizar Valor</Text>
          </TouchableOpacity>
        </View>

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