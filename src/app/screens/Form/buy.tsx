import { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import { useForm } from 'react-hook-form'
import useFinance from "@/src/app/contexts/transactionContext";
import { useBuySupabase } from "@/src/database/useBuySupabase";
import { useProductTypeSupabase } from "@/src/database/useProductTypeSupabase";
import { ISelectProps, ITBuy } from "@/src/constants/interface";
import Button from "@/src/components/Button";
import Input from "@/src/components/Form/Input";
import Select from "@/src/components/Form/Select";

type BuyProps = {
  closeModal: (value: boolean) => void;
  listBuy?: Promise<void>;
  buy?: ITBuy;
}

export default function FrmBuy({closeModal, listBuy, buy}:BuyProps) {
  const { handleSubmit, control, reset, formState:{ errors } } = useForm()
  const useProductTypeDatabase = useProductTypeSupabase()
  const { updateBuys } = useFinance()
  const buyDatabase = useBuySupabase()
  const [productTypes, setProductTypes] = useState<ISelectProps[]>([])
  const [id, setId] = useState('')

  async function handleSave(data: ITBuy) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    try {
      if(id) {
        await buyDatabase.update({
          id: Number(id),
          modality: 'buy',
          place: data.place, 
          kind: data.kind, 
          product_name: data.product_name, 
          amount: Number(data.amount), 
          price: Number(data.price), 
          datetransaction: formattedDate,
          ispaid: true  
        })
        Alert.alert('Compra atualizada com sucesso!')
      }else {
        await buyDatabase.create({
          modality: 'buy',
          place: data.place, 
          kind: data.kind, 
          product_name: data.product_name, 
          amount: Number(data.amount), 
          price: Number(data.price), 
          datetransaction: formattedDate,
          ispaid: true  
        })
        updateBuys(Number(data.price))
        Alert.alert('Compra incluída com sucesso!')
      }
      reset()
      await listBuy
      closeModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadProductTypes() {
    const response = await useProductTypeDatabase.list()
    if (response) {
      let newArray: ISelectProps[] = response.map(item => {
        return { value: String(item.kind), label: String(item.kind) }
      })
      setProductTypes(newArray)
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    loadProductTypes()
    if(buy) {
      setId(String(buy.id))
      setPlace(buy.place)
      setKind(buy.kind)
      setProductName(buy.product_name)
      setAmount(String(buy.amount))
      setPrice(String(buy.price))
    }
  },[])

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
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE COMPRAS</Text>
        </View>

        <Input 
          error={errors.place?.message}
          formProps={{
            control,
            name: 'place',
            rules: {
              required: 'Local da Compra é necessário.'
            }
          }}
          inputProps={{
            placeholder: "Local da compra"            
          }}
        />
        
        <Select 
          error={errors.kind?.message}
          arrayList={productTypes}
          formProps={{
            control,
            name: 'kind',
            defaultValue: '',
            rules: {
              required: 'O Tipo do Produto é necessário.'
            }
          }}
        />

        <Input 
          error={errors.product_name?.message}
          formProps={{
            control,
            name: 'product_name',
            rules: {
              required: 'É necessário informar o Produto'
            }
          }}
          inputProps={{
            placeholder: "Produto"            
          }}
        />

        <Input 
          error={errors.amount?.message}
          formProps={{
            control,
            name: 'amount',
            rules: {
              required: 'É necessário informar a Quantidade'
            }
          }}
          inputProps={{
            placeholder: "Quantidade",
            keyboardType: 'numeric'
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

        <Button title="Salvar" onPress={handleSubmit(handleSave)} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      
      </ScrollView>
    </KeyboardAvoidingView>
    )
}