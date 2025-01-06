import { View, Text } from 'react-native'
import { IDataTransaction } from '../constants/interface';

interface Props {
  item: IDataTransaction
}

export default function ItemList({ item }: Props) {
  return (
    <View className='w-full p-4 bg-white rounded-lg mt-2'>
      <Text>{item.name}</Text>
      <View className='flex flex-row justify-between items-center'>
        <Text className='w-1/2'>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
        </Text>
        <Text className='w-1/2 text-right'>{item.amount} unid(s)</Text>
      </View>
      <View className='flex flex-row justify-between items-center'>
        <Text className='w-1/2'>{item.modality === 'buy' ? 'Compra' : 'Venda'}</Text>
        <Text className='w-1/2 text-right'>{item.datetransaction}</Text>
      </View>
    </View>
  )
}