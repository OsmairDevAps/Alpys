import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState } from "react";
import { Text, View, Switch, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { LClients, LProducts } from "@/src/constants/db";
import { SelectList } from "react-native-dropdown-select-list";
import { MaskedTextInput } from 'react-native-mask-text'
import { Feather } from "@expo/vector-icons";

type OrderProps = {
  closeModal: (value: boolean) => void;
}

export default function FrmOrder({closeModal}:OrderProps) {
  const [clientName, setClientName] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isDelivery, setIsDelivery] = useState(false)
  const [deliveryFee, setDeliveryFee] = useState('')
  const [address, setAddress] = useState('')
  const [obs, setObs] = useState('')
  const [totPedido, setTotPedido] = useState(0)

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

  function handleClose() {
    closeModal(false)
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE ENCOMENDAS</Text>
        </View>

        <SelectList
          placeholder='Nome do Cliente'
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#eaeaea' }}
          setSelected={(val: string) => setClientName(val)}
          data={LClients}
          save="key"
        />
        <SelectList
          placeholder='Tipo de Produto'
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
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
          style={{
            width: '100%',
            color: '#4b2400', 
            backgroundColor: '#fcf3e6', 
            borderRadius: 8, 
            height: 50, 
            paddingLeft: 10, 
            placeHoldelColor: '#e2e2e2', 
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
          style={{
            width: '100%',
            color: '#4b2400', 
            backgroundColor: '#fcf3e6', 
            borderRadius: 8, 
            height: 50, 
            paddingLeft: 10, 
            placeHoldelColor: '#e2e2e2', 
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
    </KeyboardAvoidingView>
    )
}