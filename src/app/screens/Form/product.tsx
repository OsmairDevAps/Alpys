import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useState, useEffect } from "react";
import { SelectList } from 'react-native-dropdown-select-list';
import { Text, View, KeyboardAvoidingView, Platform, Alert, Modal } from "react-native";
import { useProductSupabase } from "@/src/database/useProductSupabase";
import { useCategorySupabase } from "@/src/database/useCategorySupabase";
import { ICategory, IProduct, ISelectProps } from "@/src/constants/interface";
import FrmCategory from "./category";

type Props = {
  closeModal: (value: boolean) => void;
  listProducts?: Promise<void>;
  product?: IProduct;
}

export default function FrmProduct({ closeModal, listProducts, product }:Props) {
  const categoryDatabase = useCategorySupabase()
  const productDatabase = useProductSupabase()
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)
  const [selectCategories, setSelectCategories] = useState<ISelectProps[]>([{} as ISelectProps])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [id, setId] = useState('')
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('sem foto')

  async function listCategories() {
    try {
      const response = await categoryDatabase.list()
      if(response) {
        let newArray: ISelectProps[] = response.map(cat => {
          return { key: String(cat.id), value: String(cat.category) }
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

  async function handleSave() {
    try {
      if (id) {
        await productDatabase.update({
          id: Number(id), 
          category,
          name, 
          price: Number(price), 
          photo
        })
        Alert.alert('Produto atualizado com sucesso!')
      } else {
        await productDatabase.create({category, name, price: Number(price), photo})
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
      <View className='flex flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">CADASTRO DE PRODUTOS</Text>
        </View>

        <View className="flex flex-row items-center gap-2">
          <View className="flex-1">
            <SelectList
              placeholder='Categoria'
              inputStyles={{ color: '#431407'}}
              boxStyles={{ 
                width: '100%', 
                backgroundColor: '#fdf7e5', 
                borderColor: '#f97316', 
                borderWidth: 1, 
                marginBottom: 8, 
                marginTop: 8 
              }}
              dropdownStyles={{ backgroundColor: '#fdf7e5' }}
              setSelected={(val: string) => setCategory(val)}
              data={selectCategories}
              save="value"
            />
          </View>
          <View className="w-32">
            <Button title="+ Categoria" onPress={() => setIsModalCategoryOpen(true)} />
          </View>
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