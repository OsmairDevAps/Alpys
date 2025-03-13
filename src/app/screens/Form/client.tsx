import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState, useEffect, memo } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Alert, FlatList, TouchableOpacity } from "react-native";
import { useClientSupabase } from "@/src/database/useClientSupabase";
import { IClient } from "@/src/constants/interface";
import { Feather } from "@expo/vector-icons";
import { CardClient } from "@/src/components/Card/client";

type Props = {
  closeModal: (value: boolean) => void;
  listClients?: Promise<void>;
  client?: IClient;
}

export default function FrmClient({ closeModal, listClients, client }:Props) {
  const clientDatabase = useClientSupabase()
  const [id, setId] = useState('')
  const [nameClient, setNameClient] = useState('')
  const [clients, setClients] = useState<IClient[]>([])

  async function loadClients() {
    try {
      const response = await clientDatabase.list()
      if(response) {
        setClients(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  async function handleDelete(id: number) {
    try {
      await clientDatabase.remove(id)
      Alert.alert('Cliente excluído(a) com sucesso!')
      loadClients()
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    try {
      if (id) {
        await clientDatabase.update({
          id: Number(id), 
          name: nameClient,
        })
        Alert.alert('Cadastro de cliente atualizado com sucesso!')
      } else {
        await clientDatabase.create({name: nameClient})
        Alert.alert('Cliente incluído com sucesso!')
      }
      setId('')
      setNameClient('')
      await listClients
      closeModal(false)
    } catch (error) {
      console.log(error)      
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    loadClients()
    if(client) {
      setId(String(client.id))
      setNameClient(client.name)
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex flex-1 items-center justify-start bg-orange-50 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 my-2">
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE CLIENTES</Text>
        </View>
        <Input 
          placeholder="Nome do Cliente"
          keyboardType="default"
          onChangeText={setNameClient}
          value={nameClient}
        />
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
        
        <View className="w-full my-2">
          <View className="flex flex-row w-full p-2">
            <Text className="text-white">CLIENTES CADASTRADOS:</Text>
          </View>
          <FlatList 
            className="h-1/2"
            data={clients}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => 
              <CardClient item={item} onDelete={() => handleDelete(item.id)} color={index % 2 === 0 ? "bg-orange-100" : "bg-white"} />
             }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
    )
}