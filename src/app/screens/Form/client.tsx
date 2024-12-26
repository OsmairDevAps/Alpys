import {useState} from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from "react-native"
import Input from "@/src/components/Input"
import Button from '@/src/components/Button'

type Props = {
  closeModal: (value: boolean) => void;
}

export default function FrmClient({closeModal}: Props) {
  const [nameClient, setNameClient] = useState('')

  function handleSave() {
    const data = {
      name: nameClient
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
      <View className='flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE CLIENTES</Text>
        </View>

        <Input 
          placeholder="Cliente"
          keyboardType="default"
          onChangeText={setNameClient}
          value={nameClient}
        />
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />

        </View>
      </KeyboardAvoidingView>
  )
}