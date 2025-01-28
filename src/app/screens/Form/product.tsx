import { Text, View, KeyboardAvoidingView, Platform, Alert, Modal, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import Input from "@/src/components/Form/Input";
import { useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list';
import { useProductSupabase } from "@/src/database/useProductSupabase";
import { useCategorySupabase } from "@/src/database/useCategorySupabase";
import { ICategory, IProduct, ISelectProps } from "@/src/constants/interface";
import FrmCategory from "./category";
import Select from "@/src/components/Form/Select";

type Props = {
  closeModal: (value: boolean) => void;
  listProducts?: Promise<void>;
  product?: IProduct;
}

export default function FrmProduct({ closeModal, listProducts, product }:Props) {
  const { handleSubmit, control, reset, formState:{errors} } = useForm()
  const categoryDatabase = useCategorySupabase()
  const productDatabase = useProductSupabase()
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)
  const [selectCategories, setSelectCategories] = useState<ISelectProps[]>([{} as ISelectProps])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [id, setId] = useState('')

  async function listCategories() {
    try {
      const response = await categoryDatabase.list()
      if(response) {
        let newArray: ISelectProps[] = response.map(cat => {
          return { value: String(cat.category), label: String(cat.category) }
        })
        setSelectCategories(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function loadCategories() {
    try {
      const response = await categoryDatabase.list()
      if(response) {
        setCategories(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave(data: any) {
    try {
      if (id) {
        await productDatabase.update({
          id: Number(id), 
          category: data.category,
          name: data.name, 
          price: Number(data.price), 
          photo: data.photo
        })
        Alert.alert('Produto atualizado com sucesso!')
      } else {
        await productDatabase.create({
          category: data.category, 
          name: data.name, 
          price: Number(data.price), 
          photo: data.photo
        })
        Alert.alert('Produto incluído com sucesso!')
      }
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
    listCategories()
    loadCategories()
    if(product) {
      setId(String(product.id))
      setCategory(product.category)
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
       <ScrollView contentContainerStyle={{ 
          flexGrow: 1, 
          alignItems: "center", 
          backgroundColor: '#fff7f1', 
          paddingHorizontal: 16, 
          marginTop: 96 
        }}>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE PRODUTOS</Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <View className="flex-1">
            <Select 
              error={errors.category?.message}
              arrayList={selectCategories}
              formProps={{
                control,
                name: 'category',
                defaultValue: '',
                rules: {
                  required: 'É necessário informar a Categoria.'
                }
              }}
            />
          </View>
          <View className="w-32">
            <Button title="+ Categoria" onPress={() => setIsModalCategoryOpen(true)} />
          </View>
        </View>

        <Input 
          error={errors.name?.message}
          formProps={{
            control,
            name: 'name',
            rules: {
              required: 'É necessário informar o Produto'
            }
          }}
          inputProps={{
            placeholder: "Nome do Produto"            
          }}
        />

        <Input 
          error={errors.price?.message}
          formProps={{
            control,
            name: 'price',
            rules: {
              required: 'É necessário informar o Valor'
            }
          }}
          inputProps={{
            placeholder: "Valor",
            keyboardType: 'numeric'
          }}
        />

        <Input 
          formProps={{
            control,
            name: 'photo',
          }}
          inputProps={{
            placeholder: "Imagem do produto"
          }}
        />

        <Button title="Salvar" onPress={handleSubmit(handleSave)} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </ScrollView>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalCategoryOpen}
        onRequestClose={() => {
           setIsModalCategoryOpen(!isModalCategoryOpen)
      }}>
        <FrmCategory 
          closeModal={setIsModalCategoryOpen}
          listCategories={loadCategories()}
        />
      </Modal>
    </KeyboardAvoidingView>
    )
}