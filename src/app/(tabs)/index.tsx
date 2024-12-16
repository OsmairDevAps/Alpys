import Header from '@/src/components/Header';
import ItemList from '@/src/components/ItemList';
import { Text, View, FlatList, Dimensions } from 'react-native';

export default function Listagem() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const restHeight = (windowHeight - 44 - (96 + 208)).toFixed()
  const dataGraphic = [
    {
      month: 1,
      sell: 520,
      buy: 200,
      balance: 320 
    },
    {
      month: 2,
      sell: 500,
      buy: 180,
      balance: 320 
    },
    {
      month: 3,
      sell: 500,
      buy: 150,
      balance: 450 
    },
    {
      month: 4,
      sell: 600,
      buy: 200,
      balance: 400 
    },
  ]
  const dataTransactions = [
    {
      id: 1,
      client: 'Osmair',
      price: 50,
      amount: 2,
      modality: 'sell',
      datetransaction: '01/12/2024'
    },
    {
      id: 2,
      client: 'Wanessa',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
    {
      id: 3,
      client: 'Wanessa',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
    {
      id: 4,
      client: 'Wanessa',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
    {
      id: 5,
      client: 'Wanessa',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
    {
      id: 6,
      client: 'Wanessa',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
    {
      id: 7,
      client: 'Wanessa',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
    {
      id: 8,
      client: 'Raphael',
      price: 75,
      amount: 3,
      modality: 'buy',
      datetransaction: '01/12/2024'
    },
  ]

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-950'>
      <Header />

      <View className='w-full h-52'>
        <Text>Grafico</Text>
      </View>

      <View className='w-full pt-4 pb-2 pl-8 pr-4'>
        <Text className='text-white'>Listagem:</Text>
        <FlatList 
          className='flex h-[490px]'
          data={dataTransactions}
          keyExtractor={item => String(item.id)}
          renderItem={ ({item}) => 
            <ItemList item={item} />
          }
        />
      </View>
    </View>
  );
}

