import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { LKind } from "@/src/constants/db";
import { SelectList } from "react-native-dropdown-select-list";
import { MaskedTextInput } from "react-native-mask-text";

type BuyProps = {
  closeModal: (value: boolean) => void;
}

export default function FrmBuy({closeModal}:BuyProps) {
  const [place, setPlace] = useState('')
  const [kind, setKind] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isPaid, setIsPaid] = useState(false)

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

  function handleClose() {
    closeModal(false)
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE COMPRAS</Text>
        </View>

        <Input 
          placeholder="Local da compra"
          keyboardType="default"
          onChangeText={setPlace}
          value={place}
        />

        <SelectList
          placeholder='Tipo de Produto'
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
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
            marginTop: 8,
            marginBottom: 8
          }}
          options={{
            prefix: '',
            precision: 2,
            decimalSeparator: '.',
            groupSeparator: ',',
          }}
          placeholder='0.00'
          keyboardType='numeric'
          onChangeText={(price, rawText) => {
            setPrice(price)
          }}
        />

        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>
    </KeyboardAvoidingView>
    )
}