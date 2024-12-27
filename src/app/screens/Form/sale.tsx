import { useEffect, useState } from "react";
import { Switch, Text, View, KeyboardAvoidingView, Platform, Modal } from "react-native";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { SelectList } from 'react-native-dropdown-select-list';
import { LClients, LProducts } from "@/src/constants/db";
import { MaskedTextInput } from "react-native-mask-text";
import FrmClient from "./client";
import { useClientDatabase } from "@/src/database/useClientDatabase";
import { IClient, ISelectProps } from "@/src/constants/interface";

type SaleProps = {
  closeModal: (value: boolean) => void;
}

export default function FrmSale({closeModal}:SaleProps) {
  const clientDatabase = useClientDatabase()
  const [selectClients, setSelectClients] = useState<ISelectProps[]>([{ key: '', value: '' }])
  const [productName, setProductName] = useState('')
  const [clientName, setClientName] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [isModalClientOpen, setIsModalClientOpen] = useState(false)
  
  async function list() {
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

  function handleSave() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const data = {
      modality: 'sale',
      clientName: clientName,
      productName: productName,
      amount: amount,
      price: price,
      dateTransaction: formattedDate,
      isPaid: isPaid
    }
    console.log(data)
  }
  
  function openModalClient() {
    setIsModalClientOpen(true)
  }

  function handleClose() {
    closeModal(false)
  }

  useEffect(() => {
    list()
  },[])

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className='flex-1 items-center justify-start bg-orange-950 px-4 mt-28'>
        <View className="flex flex-row justify-between items-center w-full h-10 mb-4">
          <Text className="text-lg font-bold text-orange-50">LANÇAMENTO DE VENDAS</Text>
        </View>

        <View className="flex-row justify-between w-full gap-4">
          <SelectList
            placeholder='Nome do Cliente'
            boxStyles={{ flex:1, width: 260, backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
            dropdownStyles={{ backgroundColor: '#eaeaea' }}
            setSelected={(val: string) => setClientName(val)}
            data={selectClients}
            save="key"
          />
          <Button title="+ Cliente" type="Evently" onPress={openModalClient} />
        </View>

        <SelectList
          placeholder='Produto'
          boxStyles={{ width: '100%', backgroundColor: '#fdf7e5', marginBottom: 8, marginTop: 8 }}
          dropdownStyles={{ backgroundColor: '#eaeaea' }}
          setSelected={(val: string) => setProductName(val)}
          data={LProducts}
          save="key"
        />
 
        <Input 
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
        />

        <MaskedTextInput
          type='currency'
          style={{
            width: '100%',
            color: '#4b2400', 
            backgroundColor: '#fcf3e6', 
            borderRadius: 8, 
            height: 50, 
            paddingLeft: 10, 
            placeHoldelColor: '#e2e2e2', 
            marginTop: 8,
            marginBottom: 8
          }}
          options={{
            prefix: '',
            precision: 2,
            decimalSeparator: '.',
            groupSeparator: ',',
          }}
          placeholder='0.00'
          keyboardType='numeric'
          onChangeText={(price, rawText) => {
            setPrice(price)
          }}
        />

        <View className="flex flex-row gap-4 justify-normal items-center w-full px-4 h-24">
          <Text className="text-orange-100">Produto pago?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#dde6f5'}}
            thumbColor={isPaid ? '#ffa726' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsPaid}
            value={isPaid}
          />
          <Text className="text-orange-100">{isPaid ? 'Sim' : 'Não'}</Text>
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
        <FrmClient closeModal={setIsModalClientOpen} listSelect={list()} />
      </Modal>

    </KeyboardAvoidingView>
  )
}