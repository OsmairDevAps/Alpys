import { View, Text } from 'react-native'

interface TransactionList {
  id: number;
  client: string;
  price: number;
  amount: number;
  modality: string;
  datetransaction: string;
}

interface Props {
  item: TransactionList
}

export default function ItemList({ item }: Props) {
  return (
    <View className='w-full p-4 bg-slate-50 rounded mt-2'>
      <Text>{item.client}</Text>
      <View className='flex flex-row justify-between items-center'>
        <Text className='w-1/2'>{item.price}</Text>
        <Text className='w-1/2 text-right'>{item.amount} unid(s)</Text>
      </View>
      <View className='flex flex-row justify-between items-center'>
        <Text className='w-1/2'>{item.modality === 'sell' ? 'Venda' : 'Compra'}</Text>
        <Text className='w-1/2 text-right'>{item.datetransaction}</Text>
      </View>
    </View>
  )
}