import { useState, useEffect } from "react";
import { Text, View, Switch, KeyboardAvoidingView, Platform, Keyboard, Modal, TouchableOpacity } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { SelectList } from "react-native-dropdown-select-list";
import { IOrder } from "@/src/constants/interface";
import { useOrderDatabase } from "@/src/database/useOrderDatabase";
import { useOrderSupabase } from "@/src/database/useOrderSupabase";
import { useProductDatabase } from "@/src/database/useProductDatabase";

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
  const [selectProducts, setSelectProducts] = useState<SelectProductProps[]>([{ key: '', value: '', price: 0 }])
  const [defaultValue, setDefaultValue] = useState({ key: '', value: '' })
  const [id, setId] = useState(0)
  const [clientName, setClientName] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(0)
  const [isDelivery, setIsDelivery] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState('')
  const [address, setAddress] = useState('')
  const [obs, setObs] = useState('')
  const [totPedido, setTotPedido] = useState(0)
  const productDatabase = useProductDatabase()
  const orderDatabase = useOrderDatabase()

  async function listProducts() {
    try {
      const response = await productDatabase.list()
      if(response) {
        let newArray: SelectProductProps[] = response.map(pro => {
          return { key: String(pro.id), value: String(pro.name), price: pro.price }
        })
        if(order) {
          const product = newArray.find(na => na.value === order.product_name)
          setDefaultValue({
            key: String(product?.key),
            value: String(product?.value)
          })
        }
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
    if (productName !== '' ) {
      const prod = selectProducts.find(sp => sp.value === productName)
      let value
      let total=0
      if (prod) {
        value = prod.price
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
  
  useEffect(() => {
    listProducts()
    if(order) {
      setId(order.id)
      setClientName(order.client_name)
      setProductName(order.product_name)
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
          defaultOption={defaultValue}
          setSelected={(val: string) => setProductName(val)}
          data={selectProducts}
          save="value"
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

      {/* <Modal
        transparent={true}
        animationType='slide'
        visible={isModalClientOpen}
        onRequestClose={() => {
           setIsModalClientOpen(!isModalClientOpen)
      }}>
        <FrmClient closeModal={setIsModalClientOpen} listSelect={listClients()} />
      </Modal> */}
      
    </KeyboardAvoidingView>
    )
}