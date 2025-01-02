import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useProductDatabase } from "@/src/database/useProductDatabase";
import { IProduct } from "@/src/constants/interface";

type Props = {
  closeModal: (value: boolean) => void;
  listProducts?: Promise<void>;
  product?: IProduct;
}

export default function FrmProduct({ closeModal, listProducts, product }:Props) {
  const productDatabase = useProductDatabase()
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('sem foto')

  async function handleSave() {
    try {
      if (id) {
        await productDatabase.update({
          id: Number(id), 
          name, 
          price: Number(price), 
          photo
        })
        Alert.alert('Produto atualizado com sucesso!')
      } else {
        await productDatabase.create({name, price: Number(price), photo})
        Alert.alert('Produto incluído com sucesso!')
      }
      setId('')
      setName('')
      setPrice('0.00')
      setPhoto('sem foto')
      await listProducts
      closeModal(false)
    } catch (error) {
      console.log(error)      
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    if(product) {
      setId(String(product.id))
      setName(product.name)
      setPrice(String(product.price.toFixed(2)))
      setPhoto(product.photo)
    }
  }, [])

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

        <Input 
          placeholder="Preço"
          keyboardType="numeric"
          onChangeText={setPrice}
          value={price}
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