import { useEffect, useState } from "react";
import { Switch, Text, View, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import Input from "@/src/components/Form/Input";
import Select from "@/src/components/Form/Select";
import { SelectList } from 'react-native-dropdown-select-list';
import { ITSale } from "@/src/constants/interface";
import { useProductSupabase } from "@/src/database/useProductSupabase";
import { useSaleSupabase } from "@/src/database/useSaleSupabase";

type SaleProps = {
  closeModal: (value: boolean) => void;
  listSales?: Promise<void>;
  sale?: ITSale;
}
type SelectProductProps = {
  key: number;
  label: string;
  value: string;
  price: string;
}
type FormValues = Omit<ITSale, 'id'>

export default function FrmSale({ closeModal, listSales, sale }:SaleProps) {
  const { handleSubmit, reset, control, setValue, getValues, formState:{ errors } } = useForm<FormValues>({})
  const productDatabase = useProductSupabase()
  const saleDatabase = useSaleSupabase()
  const [selectProducts, setSelectProducts] = useState<SelectProductProps[]>([])
  const [totalPrice, setTotalPrice] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  
  async function listProducts() {
    try {
      const response = await productDatabase.list()
      if(response) {
        let newArray: SelectProductProps[] = response.map(pro => {
          return { key: pro.id, value: String(pro.category) +' - '+ String(pro.name), label: String(pro.category) +' - '+ String(pro.name), price: pro.price }
        })
        setSelectProducts(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave(data: FormValues) {
    updatePrice()
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    try {
      if (sale) {
        saleDatabase.update({
          id: Number(sale.id),
          modality: 'sale',
          client_name: sale.client_name,
          product_name: sale.product_name,
          amount: data.amount,
          price: totalPrice,
          datetransaction: formattedDate,
          ispaid: isPaid
        })
        Alert.alert('Venda atualizada com sucesso!')
      } else {
        saleDatabase.create({
          modality: 'sale',
          client_name: data.client_name,
          product_name: data.product_name,
          amount: data.amount,
          price: totalPrice,
          datetransaction: formattedDate,
          ispaid: isPaid
        })
        Alert.alert('Venda incluída com sucesso!')
      }
      reset()
      setIsPaid(false)
      closeModal(false)
      } catch (error) {
      console.log(error)
    }
    await listSales
  }
  
  function updatePrice() {
    const currentValues = getValues();
    const name_product = currentValues.product_name
    const amount_product = currentValues.amount
    if (name_product !== '' ) {
      const prod = selectProducts.find(sp => String(sp.value) === String(name_product))
      let total=0
      if (prod) {
        if(Number(amount_product) > 0) {
          total = total + (Number(prod.price) * Number(amount_product))
        }
        setTotalPrice(String(total))
      }        
    }
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    listProducts()
    if(sale) {
      setValue('product_name', sale.product_name)
      setValue('client_name', sale.client_name)
      setValue('amount', String(sale.amount))
      setValue('price', String(sale.price))
      setIsPaid(sale.ispaid)
    }
  },[])

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex-1 items-center justify-start bg-orange-50 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-950">LANÇAMENTO DE VENDAS</Text>
        </View>
        {!sale ?
          <View className="w-full">
            <Input 
              error={errors.client_name?.message?.toString()}
              control={control}
              formProps={{
                name: 'client_name',
                rules: {
                  required: 'O nome do Cliente é necessário.'
                }
              }}
              inputProps={{
                placeholder: "Nome do Cliente"            
              }}
            />
            <Select 
              error={errors.product_name?.message?.toString()}
              arrayList={selectProducts}
              control={control}
              formProps={{
                name: 'product_name',
                defaultValue: '',
                rules: {
                  required: 'O Produto é necessário.'
                }
              }}
            />
          </View> :
          <View className="flex flex-col w-full justify-start items-start gap-2 mb-2">
            <Text>Cliente: {sale.client_name}</Text>
            <Text>Produto: {sale.product_name}</Text>
          </View>
        }
        
        <Input 
          error={errors.amount?.message?.toString()}
          control={control}
          formProps={{
            name: 'amount',
            rules: {
              required: 'A quantidade é necessária.'
            }
          }}
          inputProps={{
            placeholder: "Quantidade",
            keyboardType: 'numeric'
          }}
        />
  
        <View className="flex flex-row justify-start items-center w-full h-12 gap-2">
          <Text>Valor total:</Text>
          <Text>{totalPrice}</Text>
          <TouchableOpacity 
            className="ml-10 px-4 py-1 border-[1px] border-orange-200 rounded-lg bg-orange-100" 
            onPress={updatePrice}
          >
            <Text>Atualiza Valor</Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row gap-4 justify-normal items-center w-full h-14">
          <Text className="text-orange-950">Produto pago?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#dde6f5'}}
            thumbColor={isPaid ? '#ffa726' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsPaid}
            value={isPaid}
          />
          <Text className="text-orange-950">{isPaid ? 'Sim' : 'Não'}</Text>
        </View>

        <Button title="Salvar" onPress={handleSubmit(handleSave)} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>

    </KeyboardAvoidingView>
  )
}