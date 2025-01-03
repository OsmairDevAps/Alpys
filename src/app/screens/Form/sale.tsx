import { useEffect, useState } from "react";
import { Switch, Text, View, KeyboardAvoidingView, Platform, Modal, Alert, TouchableOpacity } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { SelectList } from 'react-native-dropdown-select-list';
import FrmClient from "./client";
import { useClientDatabase } from "@/src/database/useClientDatabase";
import { IClient, ISelectProps, ITSale } from "@/src/constants/interface";
import { useSaleDatabase } from "@/src/database/useSaleDatabase";
import { useProductDatabase } from "@/src/database/useProductDatabase";

type SaleProps = {
  closeModal: (value: boolean) => void;
  listSales?: Promise<void>;
  sale?: ITSale;
}
type SelectProductProps = {
  key: string;
  value: string;
  price: number;
}

export default function FrmSale({ closeModal, listSales, sale }:SaleProps) {
  const clientDatabase = useClientDatabase()
  const productDatabase = useProductDatabase()
  const saleDatabase = useSaleDatabase()
  const [selectClients, setSelectClients] = useState<ISelectProps[]>([{ key: '', value: '' }])
  const [selectProducts, setSelectProducts] = useState<SelectProductProps[]>([{ key: '', value: '', price: 0 }])
  const [id, setId] = useState('')
  const [productId, setProductId] = useState(0)
  const [productName, setProductName] = useState('')
  const [clientName, setClientName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(0)
  const [isPaid, setIsPaid] = useState(false)
  const [isModalClientOpen, setIsModalClientOpen] = useState(false)
  
  async function listClients() {
    try {
      const response = await clientDatabase.list()
      if(response) {
        let newArray: ISelectProps[] = response.map(cli => {
          return { key: String(cli.id), value: String(cli.name) }
        })
        setSelectClients(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function listProducts() {
    try {
      const response = await productDatabase.list()
      if(response) {
        let newArray: SelectProductProps[] = response.map(pro => {
          return { key: String(pro.id), value: String(pro.name), price: pro.price }
        })
        setSelectProducts(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSave() {
    updatePrice()
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    try {
      if (id) {
        saleDatabase.update({
          id: Number(id),
          modality: 'sale',
          client_name: clientName,
          product_name: productName,
          amount: Number(amount),
          price: Number(price),
          datetransaction: formattedDate,
          ispaid: isPaid
        })
        Alert.alert('Venda atualizada com sucesso!')
      } else {
        saleDatabase.create({
          modality: 'sale',
          client_name: clientName,
          product_name: productName,
          amount: Number(amount),
          price: Number(price),
          datetransaction: formattedDate,
          ispaid: isPaid
        })
        Alert.alert('Venda incluída com sucesso!')
      }
      setId('')
      setProductName('')
      setClientName('')
      setAmount('')
      setPrice(0)
      setIsPaid(false)
      closeModal(false)
      } catch (error) {
      console.log(error)
    }
    const data = {
    }
    console.log(data)
    await listSales
  }
  
  function updatePrice() {
    if (productId > 0 ) {
      const prod = selectProducts.find(sp => Number(sp.key) === Number(productId))
      let value
      let total=0
      if (prod) {
        value = prod.price
        setProductName(prod.value)
      }        
      if(Number(amount) > 0) {
        total = total + (Number(value) * Number(amount))
      }
      setPrice(total)
    }
  }

  function openModalClient() {
    setIsModalClientOpen(true)
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    listClients()
    listProducts()
    if(sale) {
      setId(String(sale.id))
      setProductName(sale.product_name)
      setClientName(sale.client_name)
      setAmount(String(sale.amount))
      setPrice(sale.price)
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

        <View className="flex-row justify-between w-full gap-4">
          <SelectList
            placeholder='Nome do Cliente'
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
            setSelected={(val: string) => setClientName(val)}
            data={selectClients}
            save="value"
          />
          <Button title="+ Cliente" type="Evently" onPress={openModalClient} />
        </View>

        <SelectList
          placeholder='Produto'
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
          setSelected={(val: number) => setProductId(val)}
          data={selectProducts}
          save="key"
        />
 
        <Input 
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
        />
 
        <View className="flex flex-row justify-start items-center w-full h-12 gap-2">
          <Text>Valor total:</Text>
          <Text>{price}</Text>
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

        <Button title="Salvar" onPress={handleSave} />
        <Button title="Fechar" type="Close" onPress={handleClose} />
      </View>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalClientOpen}
        onRequestClose={() => {
           setIsModalClientOpen(!isModalClientOpen)
      }}>
        <FrmClient 
          closeModal={setIsModalClientOpen} 
          listSelect={listClients()} 
        />
      </Modal>

    </KeyboardAvoidingView>
  )
}