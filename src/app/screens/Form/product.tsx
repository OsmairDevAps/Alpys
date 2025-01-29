import { Text, View, KeyboardAvoidingView, Platform, Alert, Modal, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import Input from "@/src/components/Form/Input";
import { useState, useEffect } from "react";
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
  const { handleSubmit, control, reset, formState:{errors}, getValues } = useForm()
  const categoryDatabase = useCategorySupabase()
  const productDatabase = useProductSupabase()
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)
  let categoryLoaded:ISelectProps = {} as ISelectProps
  const [userData, setUserData] = useState<{ name: string; category: string } | null>(null);
  const [selectCategories, setSelectCategories] = useState<ISelectProps[]>([{} as ISelectProps])
  const [id, setId] = useState('')

  async function loadCategory(category: string) {
    try {
      const response = await categoryDatabase.searchByName(category)
      if (response) {
        categoryLoaded = {
          key: response[0].id,
          value: response[0].category,
          label: response[0].category
        }
        reset(categoryLoaded)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function loadCategories() {
    try {
      const response = await categoryDatabase.list()
      if(response) {
        let newArray: ISelectProps[] = response.map(cat => {
          return { key: String(cat.id) ,value: String(cat.category), label: String(cat.category) }
        })
        setSelectCategories(newArray)
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
        reset()
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
    loadCategories()
    if(product) {
      setId(String(product.id))
      loadCategory(product.category)
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
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE PRODUTOS [{categoryLoaded.label}]</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <View className="flex-1">
            <Select 
              error={errors.category?.message}
              arrayList={selectCategories}
              formProps={{
                control,
                name: 'category',
                defaultValue: categoryLoaded,
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
            defaultValue: product?.name,
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
            defaultValue: String(product?.price),
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
            defaultValue: product?.photo,
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