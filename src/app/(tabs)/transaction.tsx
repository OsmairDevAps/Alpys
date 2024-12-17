import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Transaction() {
  const [modality, setModality] = useState()
  const [kind, setKind] = useState()
  const [place, setPlace] = useState()
  const [productName, setProductName] = useState()
  const [clientName, setClientName] = useState()
  const [amount, setAmount] = useState()
  const [price, setPrice] = useState()
  const [dateTransaction, setDateTransaction] = useState()
  const [isPaid, setIsPaid] = useState()
  const [stockId, setStockId] = useState()

  function handleSubmit() {
    console.log(amount)
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-950'>
      <Header />
      <Text className="text-white text-2xl">Transactions</Text>

      <View className="px-6">
        <Input 
          label="Quantidade" 
          keyboardType="numeric"
          value={amount}
          onChangeText={() => setAmount}
        />

      <Button title="Salvar" onPress={handleSubmit} />
      </View>

    </View>
  )
}