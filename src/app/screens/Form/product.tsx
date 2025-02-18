import { Text, View, KeyboardAvoidingView, Platform, Alert, Modal, ScrollView, TouchableOpacity, Image } from "react-native";
import { useForm } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import Button from "@/src/components/Button";
import Input from "@/src/components/Form/Input";
import { useState, useEffect } from "react";
import { useProductSupabase } from "@/src/database/useProductSupabase";
import { useCategorySupabase } from "@/src/database/useCategorySupabase";
import { IProduct, ISelectProps } from "@/src/constants/interface";
import FrmCategory from "./category";
import Select from "@/src/components/Form/Select";
import { Feather } from "@expo/vector-icons";

type Props = {
  closeModal: (value: boolean) => void;
  listProducts?: Promise<void>;
  product?: IProduct;
}

export default function FrmProduct({ closeModal, listProducts, product }:Props) {
  const { handleSubmit, control, reset, formState:{errors}, setValue } = useForm<IProduct>({})
  const categoryDatabase = useCategorySupabase()
  const productDatabase = useProductSupabase()
  const [imgPhoto, setImgPhoto] = useState<string>('../../assets/images/alpys.png')
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false)
  const [selectCategories, setSelectCategories] = useState<ISelectProps[]>([{ label: '', value: '' }])
  const [id, setId] = useState('')

  const PickImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })
    // console.log(result)
    if (!result.canceled) {
      setImgPhoto(result.assets[0].uri)
    }
  }

  const PickImageCamera = async () => {
    //LoadImage();
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      alert("Você recusou permitir que o app acesse a camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    console.log(result)
    if (!result.canceled) {
      setImgPhoto(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  }

  async function loadCategories() {
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

  async function handleSave(data: any) {
    try {
      if (product) {
        await productDatabase.update({
          id: Number(id), 
          category: product.category,
          name: data.name, 
          price: data.price, 
          photo: imgPhoto
        })
        Alert.alert('Produto atualizado com sucesso!')
      } else {
        await productDatabase.create({
          category: data.category, 
          name: data.name, 
          price: data.price, 
          photo: imgPhoto
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
      setValue('category', product.category)
      setValue('price', String(product.price))
      setValue('photo', product.photo)
      setImgPhoto(product.photo)
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
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE PRODUTOS</Text>
        </View>
        
        {!product ? 
          <View className="flex flex-row w-full justify-center items-center gap-2">
            <View className="flex-1">
            <Select 
                error={errors.category?.message?.toString()}
                control={control}
                arrayList={selectCategories}
                formProps={{
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
        :
          <View className="flex flex-col w-full gap-2 mb-4">
            <View className="flex flex-row gap-2">
              <Text className="font-semibold">Categoria:</Text>
              <Text>{product.category}</Text>
            </View>
          </View>
        }
        <Input 
          error={errors.name?.message?.toString()}
          control={control}
          formProps={{
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
          error={errors.price?.message?.toString()}
          control={control}
          formProps={{
            name: 'price',
            defaultValue: product?.price,
            rules: {
              required: 'É necessário informar o Valor'
            }
          }}
          inputProps={{
            placeholder: "Valor",
            keyboardType: 'numeric'
          }}
        />

        {/* <Input 
          control={control}
          formProps={{
            name: 'photo',
            defaultValue: product?.photo || 'sem foto',
          }}
          inputProps={{
            placeholder: "Imagem do produto"
          }}
        /> */}

        <View className="flex-col w-full my-4">
          <View className="flex-row justify-start w-full h-10 items-center gap-2">
            <Text className="font-semibold text-xl">Foto:</Text>
            <TouchableOpacity onPress={PickImageLibrary}>
              <Feather name="image" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={PickImageCamera}>
              <Feather name='camera' size={28} />
            </TouchableOpacity>
          </View>
          <View>
            <Image width={100} height={100} source={{ uri: imgPhoto }} />
          </View>
        </View>

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