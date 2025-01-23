import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useCategorySupabase } from "@/src/database/useCategorySupabase";
import { ICategory } from "@/src/constants/interface";

type Props = {
  closeModal: (value: boolean) => void;
  listCategories?: Promise<void>;
  category?: ICategory;
}

export default function FrmCategory({ closeModal, listCategories, category }:Props) {
  const categoryDatabase = useCategorySupabase()
  const [id, setId] = useState('')
  const [nameCategory, setNameCategory] = useState('')

  async function handleSave() {
    try {
      if (id) {
        await categoryDatabase.update({
          id: Number(id), 
          category: nameCategory,
        })
        Alert.alert('Categoria atualizada com sucesso!')
      } else {
        await categoryDatabase.create({category: nameCategory})
        Alert.alert('Categoria incluída com sucesso!')
      }
      setId('')
      setNameCategory('')
      await listCategories
      closeModal(false)
    } catch (error) {
      console.log(error)      
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    if(category) {
      setId(String(category.id))
      setNameCategory(category.category)
    }
  }, [])

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE CATEGORIAS</Text>
        </View>

        <Input 
          placeholder="Categoria"
          keyboardType="default"
          onChangeText={setNameCategory}
          value={nameCategory}
        />

        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
        
      </View>
    </KeyboardAvoidingView>
    )
}