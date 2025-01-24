import Button from "@/src/components/Button";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { ITSale } from "@/src/constants/interface";
import { useSaleSupabase } from "@/src/database/useSaleSupabase";

type SaleProps = {
  closeModal: (value: boolean) => void;
  id?: number;
}

export default function ViewSale({closeModal, id}:SaleProps) {
  const saleDatabase = useSaleSupabase()
  const [sale, setSale] = useState<ITSale>()

  async function loadSale() {
    try {
      if(id) {
        const response = await saleDatabase.searchById(id)
        if(response) {
          setSale(response[0])
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
    loadSale()
  },[])

  return (
      <View className='flex flex-1 bg-orange-50 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE VENDAS</Text>
        </View>

        <View className="flex flex-row items-center p-2 gap-2">
          <Text className="text-lg font-bold">Cliente:</Text>
          <Text className="text-lg font-semibold">{sale?.client_name}</Text>
        </View>

        <View className="flex flex-row items-center p-2 gap-2">
          <Text className="text-lg font-bold">Produto:</Text>
          <Text className="text-lg font-semibold">{sale?.product_name}</Text>
        </View>

        <View className="flex flex-row items-center p-2 gap-2">
          <Text className="text-lg font-bold">Quantidade:</Text>
          <Text className="text-lg font-semibold">{sale?.amount}</Text>
        </View>

        <View className="flex flex-row items-center p-2 gap-2">
          <Text className="text-lg font-bold">Valor:</Text>
          <Text className="text-lg font-semibold">
            {Intl.NumberFormat('pt-BR', 
              {style: 'currency', currency: 'BRL'})
              .format(Number(sale?.price))}
          </Text>
        </View>

        <View className="flex flex-row items-center p-2 gap-2">
          <Text className="text-lg font-bold">Venda paga?</Text>
          <Text className="text-lg font-semibold">{sale?.ispaid === true ? 'Sim' : 'Não'}</Text>
        </View>

        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>
    )
}