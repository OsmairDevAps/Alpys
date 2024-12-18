import { useState } from "react";
import { Text, View } from "react-native";
import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";

export default function Sales() {
  const [productName, setProductName] = useState('')
  const [clientName, setClientName] = useState('')
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
      <Text className="text-white text-2xl">Vendas</Text>

      <View className="px-6">
            <Input 
              placeholder="Nome o Cliente"
              keyboardType="default"
              onChangeText={setClientName}
              value={clientName}
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
 
    </View>
  )
}