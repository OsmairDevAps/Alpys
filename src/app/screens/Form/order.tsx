import { useState, useEffect } from "react";
import { Text, View, Switch, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { Controller, useForm } from "react-hook-form";
import Button from "@/src/components/Button";
import Input from "@/src/components/Form/Input";
import Select from "@/src/components/Form/Select";
import MaskInput, { Masks } from 'react-native-mask-input';
import { IOrder } from "@/src/constants/interface";
import { useOrderSupabase } from "@/src/database/useOrderSupabase";
import { useProductSupabase } from "@/src/database/useProductSupabase";
import { convertDateStringToDate, convertDateToString, convertISOToFormattedString, getSecondWord } from "@/src/util/functions";

type OrderProps = {
  closeModal: (value: boolean) => void;
  listOrder: Promise<void>;
  order?: IOrder;
}

type SelectProductProps = {
  key: string;
  label: string;
  value: string;
  price: number;
}

type TOrder = {
  client_name: string;
  product_name: string;
  amount: string;
  price: string;
  isdelivery: boolean;
  deliveryfee: string;
  address: string;
  obs: string;
  order_data: string;
  delivered: boolean;
}

export default function FrmOrder({closeModal, listOrder, order}:OrderProps) {
  const { handleSubmit, reset, getValues, setValue, control, formState: {errors} } = useForm<TOrder>({})
  const [selectProducts, setSelectProducts] = useState<SelectProductProps[]>([{ key: '', label: '', value: '', price: 0 }])
  const [defaultValue, setDefaultValue] = useState({ key: '', value: '' })
  const [id, setId] = useState(0)
  const [valuePrice, setValuePrice] = useState('')
  const [delivered, setDelivered] = useState(false)
  const [totPedido, setTotPedido] = useState(0)
  const productDatabase = useProductSupabase()
  const orderDatabase = useOrderSupabase()

  async function listProducts() {
    try {
      const response = await productDatabase.list()
      if(response) {
        let newArray: SelectProductProps[] = response.map(pro => {
          return { key: pro.id, value: String(pro.category) +' - '+ String(pro.name), label: String(pro.category) +' - '+ String(pro.name), price: pro.price }
        })
        if(order) {
          const product = newArray.find(na => na.value === order.product_name)
          setDefaultValue({
            key: String(product?.key),
            value: String(product?.value)
          })
        }
        setSelectProducts(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave(data: TOrder) {
    updatePrice()
    const dataFormatted = convertDateStringToDate(data.order_data);
    try {
      if(order) {
        await orderDatabase.update({
          id: Number(id),
          client_name: data.client_name, 
          product_name: data.product_name, 
          amount: Number(data.amount), 
          price: Number(valuePrice), 
          isdelivery: data.isdelivery, 
          deliveryfee: Number(data.deliveryfee), 
          address: data.address, 
          obs: data.obs,
          order_data: dataFormatted,
          delivered: delivered
        })
        Alert.alert('Encomenda alterada com sucesso.')
      } else {
        await orderDatabase.create({
          client_name: data.client_name, 
          product_name: data.product_name, 
          amount: Number(data.amount), 
          price: Number(valuePrice), 
          isdelivery: data.isdelivery, 
          deliveryfee: Number(data.deliveryfee), 
          address: data.address, 
          obs: data.obs,
          order_data: dataFormatted,
          delivered: delivered
        })
        Alert.alert('Encomenda incluída com sucesso.')
        reset()
      }
      await listOrder
      closeModal(false)
    } catch (error) {
      console.log(error)      
    }
  }

  function updatePrice() {
    const currentValues = getValues();
    const name_product = currentValues.product_name
    const amount_product = currentValues.amount
    const delivery_fee = currentValues.deliveryfee
    if (name_product !== '' ) {
      const prod = selectProducts.find(sp => String(sp.value) === String(name_product))
      let total=0
      if (prod) {
        if(Number(amount_product) > 0) {
          total = total + (Number(prod.price) * Number(amount_product))
        }
        if (Number(delivery_fee) > 0) {
          total = total + Number(delivery_fee)
        }
        setValuePrice(String(total))
      }        
    } else {
      Alert.alert('Não foi possível encontrar o produto, favor informar o protudo a ser incluido.')
    }
  }

  function handleClose() {
    closeModal(false)
  }
  
  useEffect(() => {
    listProducts()
    if(order) {
      setId(order.id)
      setValue('client_name', order.client_name)
      setValue('product_name', order.product_name)
      setValue('amount', String(order.amount))
      setValue('price', String(order.price))
      setValue('isdelivery', order.isdelivery)
      setValue('deliveryfee', String(order.deliveryfee))
      setValue('address', order.address)
      setValue('order_data', convertISOToFormattedString(String(order.order_data)))
      setValue('obs', order.obs)
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
        <View className="items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-950">CADASTRO DE ENCOMENDAS</Text>
        </View>
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
            placeholder: 'Quantidade',
            keyboardType: 'numeric'
          }}
        />

        <View className="flex flex-row w-full gap-4 justify-normal items-center">
          <Text className="text-orange-950">Para entrega?</Text>
          <Controller 
            name="isdelivery"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Switch
                trackColor={{false: '#767577', true: '#dde6f5'}}
                thumbColor={field.value ? '#ffa726' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />
          {/* <Text className="text-orange-950">{ ? 'Sim' : 'Não'}</Text> */}
        </View>

        <Input 
          error={errors.deliveryfee?.message?.toString()}
          control={control}
          formProps={{
            name: 'deliveryfee',
            rules: {
              required: 'A taxa de entrega é necessária.'
            }
          }}
          inputProps={{
            placeholder: 'Taxa de entrega',
            keyboardType: 'numeric'
          }}
        />

        <Input 
          error={errors.address?.message?.toString()}
          control={control}
          formProps={{
            name: 'address',
            rules: {
              required: 'O endereço de entrega é necessário.'
            }
          }}
          inputProps={{
            placeholder: 'Endereço de entrega'
          }}
        />

        <Input 
          error={errors.obs?.message?.toString()}
          control={control}
          formProps={{
            name: 'obs'
          }}
          inputProps={{
            placeholder: "Observação"
          }}
        />

        <Controller
          name="order_data"
          control={control}
          rules={{
            required: 'A data de entrega é obrigatória',
            pattern: {
              value: /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
              message: 'Data inválida. Use o formato dd/mm/yyyy',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <MaskInput 
              placeholder="Data de entrega"
              className="w-full mb-4 p-4 text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg"
              value={field.value}
              onChangeText={field.onChange}
              mask={Masks.DATE_DDMMYYYY}
            />
          )}
        />

        <View className="flex flex-row justify-start items-center w-full gap-2">
          <Text>Valor total:</Text>
          <Text>{valuePrice}</Text>
          <TouchableOpacity 
            className="ml-10 px-4 py-1 border-[1px] border-orange-200 rounded-lg bg-orange-100" 
            onPress={updatePrice}
          >
            <Text>Atualizar Valor</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-orange-100">
          VALOR TOTAL: {Intl
            .NumberFormat('pt-BR', 
              {style: 'currency', currency: 'BRL' })
            .format(totPedido)}
        </Text>

        <Button title="Salvar" onPress={handleSubmit(handleSave)} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </ScrollView>
      
    </KeyboardAvoidingView>
    )
}