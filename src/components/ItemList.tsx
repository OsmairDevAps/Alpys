import { View, Text, TouchableOpacity } from 'react-native'
import { IDataTransaction } from '../constants/interface';
import { useEffect, useState } from 'react';

interface Props {
  item: IDataTransaction
  onPress?: () => void
}

export default function ItemList({ item, onPress }: Props) {
  const [styleModality, setStyleModality] = useState('w-1/2')
  const dateString = String(item.created_at);
  const validDateString = dateString.replace(' ', 'T').slice(0, 23); // Ajusta para '2025-01-07T16:39:30.743'
  const date = new Date(validDateString);
  const formattedDate = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
  }).format(date);
  
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
    <TouchableOpacity onPress={onPress}>
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
        <Text className='w-1/2 text-right'>{formattedDate}</Text>
      </View>

    </View>
    </TouchableOpacity>
  )
}