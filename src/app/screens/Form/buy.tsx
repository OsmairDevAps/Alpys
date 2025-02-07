import { useState, useEffect } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import { useForm } from 'react-hook-form'
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
type FormValues = Omit<ITBuy, 'id'>

export default function FrmBuy({closeModal, listBuy, buy}:BuyProps) {
  const { handleSubmit, control, reset, formState:{ errors }, setValue } = useForm<FormValues>({})
  const useProductTypeDatabase = useProductTypeSupabase()
  const buyDatabase = useBuySupabase()
  const [productTypes, setProductTypes] = useState<ISelectProps[]>([])
  const [id, setId] = useState('')

  async function handleSave(data: FormValues) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    try {
      if(buy) {
        await buyDatabase.update({
          id: buy.id,
          modality: 'buy',
          place: buy.place, 
          kind: buy.kind, 
          product_name: buy.product_name, 
          amount: data.amount, 
          price: data.price, 
          datetransaction: formattedDate,
          ispaid: true  
        })
        Alert.alert('Compra atualizada com sucesso!')
      } else {
        await buyDatabase.create({
          modality: 'buy',
          place: data.place, 
          kind: data.kind, 
          product_name: data.product_name, 
          amount: data.amount, 
          price: data.price, 
          datetransaction: formattedDate,
          ispaid: true  
        })
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
      let newArray = response.map(item => {
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
      setValue('modality', buy.modality)
      setValue('place', buy.place)
      setValue('kind', buy.kind)
      setValue('product_name', buy.product_name)
      setValue('amount', String(buy.amount))
      setValue('price', String(buy.price))
      setValue('datetransaction', buy.datetransaction)
      setValue('ispaid', buy.ispaid)
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

        {!buy ?
          <View className="w-full">
            <Input 
              error={errors.place?.message?.toString()}
              control={control}
              formProps={{
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
              error={errors.kind?.message?.toString()}
              arrayList={productTypes}
              control={control}
              formProps={{
                name: 'kind',
                defaultValue: '',
                rules: {
                  required: 'O Tipo do Produto é necessário.'
                }
              }}
            />

            <Input 
              error={errors.product_name?.message?.toString()}
              control={control}
              formProps={{
                name: 'product_name',
                rules: {
                  required: 'É necessário informar o Produto'
                }
              }}
              inputProps={{
                placeholder: "Produto"            
              }}
            />
          </View>
        : 
          <View className="flex flex-col w-full gap-2 mb-4">
            <View className="flex flex-row gap-2 w-full">
              <Text className="font-semibold">Local da compra:</Text>
              <Text>{buy.place}</Text>
            </View>
            <View className="flex flex-row gap-2 w-full">
              <Text className="font-semibold">Tipo de produto:</Text>
              <Text>{buy.kind}</Text>
            </View>
            <View className="flex flex-row gap-2 w-full">
              <Text className="font-semibold">Produto:</Text>
              <Text>{buy.product_name}</Text>
            </View>
          </View>
        }

        <Input 
          error={errors.amount?.message?.toString()}
          control={control}
          formProps={{
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
          error={errors.price?.message?.toString()}
          control={control}
          formProps={{
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