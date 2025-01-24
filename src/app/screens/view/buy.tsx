import Button from "@/src/components/Button";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useBuySupabase } from "@/src/database/useBuySupabase";
import { ITBuy } from "@/src/constants/interface";

type BuyProps = {
  closeModal: (value: boolean) => void;
  id?: number;
}

export default function ViewBuy({closeModal, id}:BuyProps) {
  const buyDatabase = useBuySupabase()
  const [buy, setBuy] = useState<ITBuy>()

  async function loadBuy() {
    try {
      if(id) {
        const response = await buyDatabase.searchById(id)
        if(response) {
          setBuy(response[0])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    loadBuy()
  },[])

  return (
      <View className='flex flex-1 bg-orange-50 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE COMPRAS</Text>
        </View>

        <View className="flex flex-row items-center p-1 gap-2">
          <Text className="text-lg font-bold">Local da Compra:</Text>
          <Text className="text-lg font-semibold">{buy?.place}</Text>
        </View>

        <View className="flex flex-row items-center p-1 gap-2">
          <Text className="text-lg font-bold">Tipo de Produto:</Text>
          <Text className="text-lg font-semibold">{buy?.kind}</Text>
        </View>

        <View className="flex flex-row items-center p-1 gap-2">
          <Text className="text-lg font-bold">Produto:</Text>
          <Text className="text-lg font-semibold">{buy?.product_name}</Text>
        </View>

        <View className="flex flex-row items-center p-1 gap-2">
          <Text className="text-lg font-bold">Quantidade:</Text>
          <Text className="text-lg font-semibold">{buy?.amount}</Text>
        </View>

        <View className="flex flex-row items-center p-1 gap-2">
          <Text className="text-lg font-bold">Preço:</Text>
          <Text className="text-lg font-semibold">
            {Intl.NumberFormat('pt-BR', 
              {style: 'currency', currency: 'BRL'})
              .format(Number(buy?.price))}
          </Text>
        </View>

        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>
    )
}