import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { useSaleSupabase } from "@/src/database/useSaleSupabase";
import { ITResumeSale } from "@/src/constants/interface";
import Button from "@/src/components/Button";
import { Picker } from "@react-native-picker/picker";

type ResumeSaleProps = {
  closeModal: (value: boolean) => void;
}
type ClientNotPayd = {
  client_name: string;
}

export default function ResumeSale({closeModal}:ResumeSaleProps) {
  const viewRef = useRef<View | null>(null);
  const saleDatabase = useSaleSupabase()
  const [clients, setClients] = useState<ClientNotPayd[]>([])
  const [resumeClients, setResumeClients] = useState<ITResumeSale[]>([])
  const [selectedClient, setSelectedClient] = useState('')
  let total_price=0

  async function listClients() {
    try {
      const response = await saleDatabase.listClientsNotPaid()
      if (response) {
        setClients(response)
      }
    } catch (error) {
      console.log(error)      
    }
  }

  async function listResumeClient(nameClient: string) {
    try {
      const response = await saleDatabase.listResumeClients(nameClient)
      if (response) {
        setResumeClients(response)
        response.map(item => {
          total_price = Number(total_price) + Number(item.price)
        })
        
      }
    } catch (error) {
      console.log(error)      
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(()=> {
    listClients()
    listResumeClient(selectedClient)
  },[])

  return (
    <View className='flex-1 items-center justify-start bg-orange-50 px-4 mt-28'>
      <View className="w-full h-16 mt-4 text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg">
        <Picker
          selectedValue={selectedClient}
          onValueChange={(itemValue) => {
            setSelectedClient(itemValue)
            listResumeClient(itemValue)
          }}
        >
          <Picker.Item 
            label='Selecione o cliente'
            value=''
            color='#adacac'
          />
          {clients.map((cli) => (
            <Picker.Item 
              key={cli.client_name} 
              label={cli.client_name} 
              value={cli.client_name} 
            />
          ))}
        </Picker>
      </View>

      <View className="flex flex-row gap-2 w-full h-10 my-4 justify-start items-center bg-orange-50">
        <Text className="text-orange-950 font-semibold text-lg">CIENTE:</Text>
        <Text className="text-orange-950 text-lg">{selectedClient}</Text>
      </View>
      <View className="flex flex-row gap-2 w-full h-10 justify-start items-center bg-orange-200 border-b-[1px] border-orange-400">
        <Text className="flex-1 text-orange-950 font-semibold text-md">PRODUTO</Text>
        <Text className="w-24 text-center text-orange-950 font-semibold text-md">QUANT.</Text>
        <Text className="w-24 text-orange-950 font-semibold text-md">VALOR</Text>
      </View>
      {resumeClients.map(rc => (
        <View key={rc.id} className="flex flex-row gap-2 w-full h-10 justify-start items-center bg-orange-100 border-b-[1px] border-orange-300">
          <Text className="flex-1 text-orange-950 font-semibold text-md">{rc.product_name}</Text>
          <Text className="w-24 text-center text-orange-950 font-semibold text-md">{rc.amount}</Text>
          <Text className="w-24 text-orange-950 font-semibold text-md">
            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(Number(rc.price))}
          </Text>
        </View>
      ))}
      <View className="flex flex-row gap-2 w-full h-10 justify-start items-center bg-orange-50">
        <Text className="flex-1 text-orange-950 font-semibold text-md">TOTAL:</Text>
        <Text className="w-24 text-orange-950 font-semibold text-md">
          {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(total_price)}
        </Text>
      </View>

      <Button title="Fechar" type="Close" onPress={handleClose} />
    </View>
  )
}
