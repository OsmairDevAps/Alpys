import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import { Link } from "expo-router";

export default function Transaction() {
  const [place, setPlace] = useState('')
  const [kind, setKind] = useState('')
  const [productName, setProductName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [stockId, setStockId] = useState(0)

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
        <Text className="text-white text-xl">Listar</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-6">
            <Input 
              placeholder="Local da compra"
              keyboardType="default"
              onChangeText={setPlace}
              value={place}
            />

            <Input 
              placeholder="Tipo de Produto"
              keyboardType="default"
              onChangeText={setKind}
              value={kind}
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </View>
  )
}