import {useEffect, useState} from 'react'
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native"
import Input from "@/src/components/Input"
import Button from '@/src/components/Button'
import { useClientDatabase } from '@/src/database/useClientDatabase'
import { IClient } from '@/src/constants/interface'
import { CardClient } from '@/src/components/Card/client'

type Props = {
  closeModal: (value: boolean) => void;
  listSelect?: Promise<void>
}

export default function FrmClient({closeModal, listSelect}: Props) {
  const clientDatabase = useClientDatabase()
  const [clients, setClients] = useState<IClient[]>([])
  const [nameClient, setNameClient] = useState('')

  async function listClients() {
    try {
      const response = await clientDatabase.list()
      if(response) {
        setClients(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  async function update(cli: IClient) {
    try {
      await clientDatabase.update({
        id: cli.id,
        name: cli.name
      })
      await listClients()
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      await clientDatabase.remove(id)
      await listClients()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    await clientDatabase.create({
      name: nameClient
    })
    setNameClient('')
    await listClients()
  }

  async function handleClose() {
    await listSelect
    closeModal(false)
  }

  useEffect(() => {
    listClients()
  },[])

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#fff7ed', marginTop: 100}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='bg-orange-50 px-4 mb-4'>
        <Text className="text-lg font-bold text-orange-950">CADASTRO DE CLIENTES</Text>

        <Input 
          placeholder="Cliente"
          keyboardType="default"
          onChangeText={setNameClient}
          value={nameClient}
        />
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>
      
      <Text className='text-orange-950 font-bold px-4'>INCLUÍDOS:</Text>
      <FlatList 
        data={clients}
        keyExtractor={(item)=>String(item.id)}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => 
          <CardClient 
            item={item}
            onDelete={() => remove(item.id)}
            onUpdate={() => update(item)}
          />
        }
      />
    </KeyboardAvoidingView>
  )
}
