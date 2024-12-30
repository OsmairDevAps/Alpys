import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { LKind } from "@/src/constants/db";
import { SelectList } from "react-native-dropdown-select-list";

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
      <View className='flex flex-1 items-center justify-start bg-orange-50 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE COMPRAS</Text>
        </View>

        <Input 
          placeholder="Local da compra"
          keyboardType="default"
          onChangeText={setPlace}
          value={place}
        />

        <SelectList
          placeholder='Tipo de Produto'
          inputStyles={{ color: '#431407'}}
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', borderColor: '#f97316', borderWidth: 1, marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#fdf7e5' }}
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
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={setPrice}
          value={price}
        />

        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>
    </KeyboardAvoidingView>
    )
}