import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaskedTextInput } from "react-native-mask-text";

type Props = {
  closeModal: (value: boolean) => void;
}

export default function FrmProduct({closeModal}:Props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('')

  function handleSave() {
    const data = {
      name: name,
      price: price,
      photo: photo,
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
      <View className='flex flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE PRODUTOS</Text>
        </View>

        <Input 
          placeholder="Nome do Produto"
          keyboardType="default"
          onChangeText={setName}
          value={name}
        />
        
        <MaskedTextInput
          type='currency'
          style={{
            width: '100%',
            color: '#4b2400', 
            backgroundColor: '#fcf3e6', 
            borderRadius: 8, 
            height: 50, 
            paddingLeft: 10, 
            placeHoldelColor: '#e2e2e2', 
            marginTop: 8
          }}
          options={{
            prefix: '',
            precision: 2,
            decimalSeparator: '.',
            groupSeparator: ',',
          }}
          placeholder='Preço'
          keyboardType='numeric'
          onChangeText={(price, rawText) => {
            setPrice(price)
          }}
        />

        <Input 
          placeholder="Imagem/Foto"
          keyboardType="default"
          onChangeText={setPhoto}
          value={photo}
        />

        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>
    </KeyboardAvoidingView>
    )
}