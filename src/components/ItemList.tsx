import { View, Text } from 'react-native'
import { IDataTransaction } from '../constants/interface';
import { useEffect, useState } from 'react';

interface Props {
  item: IDataTransaction
}

export default function ItemList({ item }: Props) {
  const [styleModality, setStyleModality] = useState('w-1/2')

  function loadStyle() {
    if(item.modality === 'buy') {
      setStyleModality('w-1/2 text-red-800')
    } else {
      setStyleModality('w-1/2 text-green-800')
    }
  }

  useEffect(() => {
    loadStyle()
  },[])

  return (
    <View className='w-full p-4 bg-white rounded-lg border-[1px] border-orange-200 mt-2'>
      <Text className='text-xl font-bold'>{item.name}</Text>
      <View className='flex flex-row justify-between items-center'>
        <Text className='w-1/2 text-lg'>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
        </Text>
        <Text className='w-1/2 text-right'>{item.amount} unid(s)</Text>
      </View>
      <View className='flex flex-row justify-between items-center'>
        <Text className={styleModality}>{item.modality === 'buy' ? 'Compra' : 'Venda'}</Text>
        <Text className='w-1/2 text-right'>{item.datetransaction}</Text>
      </View>
    </View>
  )
}