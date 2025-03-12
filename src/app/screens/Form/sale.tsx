import { useEffect, useState, memo } from "react";
import { Switch, Text, View, KeyboardAvoidingView, Platform, Alert, Modal } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { ITSale } from "@/src/constants/interface";
import { useProductSupabase } from "@/src/database/useProductSupabase";
import { useSaleSupabase } from "@/src/database/useSaleSupabase";
import { Picker } from "@react-native-picker/picker";
import { useClientSupabase } from "@/src/database/useClientSupabase";
import FrmClient from "./client";

type SaleProps = {
  closeModal: (value: boolean) => void;
  listSales?: Promise<void>;
  sale?: ITSale;
}

type SelectClientProps = {
  id: number;
  name: string;
}

type SelectProductProps = {
  id: number;
  name: string;
  price: number;
}

export default function FrmSale({ closeModal, listSales, sale }:SaleProps) {
  const productDatabase = useProductSupabase()
  const clientDatabase = useClientSupabase()
  const saleDatabase = useSaleSupabase()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState<SelectClientProps[]>([]);
  const [selectedClient, setSelectedClient] = useState({} as SelectClientProps);
  const [products, setProducts] = useState<SelectProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState({} as SelectProductProps);
  const [nameClient, setNameClient] = useState('')
  const [nameProduct, setNameProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(0)
  const [errorClient, setErrorClient] = useState('')
  const [errorProduct, setErrorProduct] = useState('')
  const [errorAmount, setErrorAmount] = useState('')
  const [dateTransaction, setDateTransaction] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  async function listClients() {
    try {
      const response = await clientDatabase.list()
      if(response) {
        let newArray: SelectClientProps[] = response.map(cli => {
          return { id: cli.id, name: String(cli.name) }
        })
        setClients(newArray)
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
          return { id: pro.id, name: String(pro.category) +' - '+ String(pro.name), price: pro.price }
        })
        setProducts(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function reset() {
    setNameClient('')
    setNameProduct('')
    setAmount('')
    setPrice(0)
    setDateTransaction('')
    setIsPaid(false)
    setTotalPrice(0)
  }

  async function handleSave() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    try {
      if(!nameClient) {
        setErrorClient('O nome do cliente é necessário')
        return;
      } else {
        setErrorClient('')
      }
      if(!nameProduct) {
        setErrorProduct('É necessário escolher o produto')
        return;
      }else {
        setErrorProduct('')
      }
      if(!amount || parseInt(amount) <= 0) {
        setErrorAmount('A quantidade é necessária')
        return;
      }else {
        setErrorAmount('')
      }
      if (sale) {
        saleDatabase.update({
          id: Number(sale.id),
          modality: 'sale',
          client_name: sale.client_name,
          product_name: sale.product_name,
          amount: amount,
          price: String(totalPrice),
          datetransaction: formattedDate,
          ispaid: isPaid
        })
        Alert.alert('Venda atualizada com sucesso!')
      } else {
        saleDatabase.create({
          modality: 'sale',
          client_name: nameClient,
          product_name: nameProduct,
          amount: amount,
          price: String(totalPrice),
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
  
  const handleQuantityChange = (text: string) => {
    const qty = parseInt(text) || 0;
    setAmount(text);
    setTotalPrice(qty * (selectedProduct.price || 0));
  };

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    listClients()
    listProducts()
    if(sale) {
      setNameProduct(sale.product_name)
      setNameClient(sale.client_name)
      setAmount(String(sale.amount))
      setPrice(Number(sale.price))
      setIsPaid(sale.ispaid)
      setTotalPrice(Number(sale.price))
      setSelectedProduct({
        id: 1,
        name: sale.product_name,
        price: Number(sale.price) / Number(sale.amount)
      })
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
            <View className="flex flex-row w-full justify-start items-center gap-4">
              <View className="flex-1 w-full h-16 text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg">
                <Picker
                  selectedValue={selectedClient.id}
                  onValueChange={(itemValue) => {
                    const client = clients.find((c) => c.id === itemValue);
                    if (client) {
                      setSelectedClient(client);
                      setNameClient(client.name);
                    }
                  }}
                >
                  <Picker.Item 
                    label='Cliente'
                    value='0'
                    color='#adacac'
                  />
                  {clients.map((client) => (
                    <Picker.Item 
                      key={client.id} 
                      label={client.name} 
                      value={client.id} 
                    />
                  ))}
                </Picker>
                {errorClient ? <Text className='text-red-600'>{errorClient}</Text> : null}
              </View>
              <View className="w-16">
                <Button title="+ CLI" onPress={handleOpenModal} />
              </View>
            </View>

            <View className="w-full h-16 text-orange-950 bg-orange-50 border-[1px] border-orange-500 rounded-lg">
              <Picker
                selectedValue={selectedProduct.id}
                onValueChange={(itemValue) => {
                  const product = products.find((p) => p.id === itemValue);
                  if (product) {
                    setSelectedProduct(product);
                    setNameProduct(product.name);
                    setTotalPrice(parseInt(amount) * product.price || 0);
                  }
                }}
              >
                <Picker.Item 
                  label='Produto'
                  value='0'
                  color='#adacac'
                />
                {products.map((product) => (
                  <Picker.Item 
                    key={product.id} 
                    label={product.name} 
                    value={product.id} 
                  />
                ))}
              </Picker>
            </View>
            {errorProduct ? <Text className='text-red-600'>{errorProduct}</Text> : null}

          </View> :
          <View className="flex flex-col w-full justify-start items-start gap-2 mb-2">
            <Text>Cliente: {sale.client_name}</Text>
            <Text>Produto: {sale.product_name}</Text>
          </View>
        }
        
        <View className="w-full flex flex-col justify-start items-start">
          <Input 
            placeholder="Quantidade"
            value={amount}
            onChangeText={handleQuantityChange}
            keyboardType= 'numeric'
          /> 
          {errorAmount ? <Text className='text-red-600'>{errorAmount}</Text> : null}
        </View>

        <View className="w-full h-16 flex flex-row justify-start items-center gap-2">
          <Text>Valor total:</Text>
          <Text>
            {Intl
              .NumberFormat('pt-BR', 
                {
                  style: 'currency', 
                  currency:'BRL'
                })
              .format(Number(totalPrice))}
          </Text>
        </View>

        <View className="w-full h-16 flex flex-row gap-4 justify-normal items-center">
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
        visible={isModalOpen}
        onRequestClose={() => {
           setIsModalOpen(!isModalOpen)
      }}>
        <FrmClient
          closeModal={setIsModalOpen} 
          listClients={listClients()} 
        />
      </Modal>
    </KeyboardAvoidingView>
  )
}