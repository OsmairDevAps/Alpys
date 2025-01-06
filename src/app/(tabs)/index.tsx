import { useEffect, useState } from 'react';
import { Text, View, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import { router } from 'expo-router'
import Header from '@/src/components/Header';
import ItemList from '@/src/components/ItemList';
import { GraphicProps, IDataTransaction } from '@/src/constants/interface'
import { useTransactionDatabase } from '@/src/database/useTransactionDatabase';

export default function Listagem() {
  const transactionDatabase = useTransactionDatabase()
  const [balances, setBalances] = useState<GraphicProps[]>([])
  const [income, setIncome] = useState(0)
  const [totalPriceBuy, setTotalPriceBuy] = useState(0)
  const [totalPriceSale, setTotalPriceSale] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  const [dataTransaction, setDataTransaction] = useState<IDataTransaction[]>([])
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const restHeight = (windowHeight - 348).toFixed()
  const { height, width } = useWindowDimensions();
  const [styleBalance, setStyleBalance] = useState('flex justify-between items-center bg-white  p-4 gap-2 border-[1px] border-orange-300')

  async function listTransactions() {
    try {
      const response = await transactionDatabase.list()
      setDataTransaction(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadBalance() {
    try {
      const response: GraphicProps[] = await transactionDatabase.listGraphic()
      response.map(res => {
        if (res.modality === 'buy') {
          setTotalPriceBuy(Number(res.total_price))
        }
        if (res.modality === 'sale') {
          setTotalPriceSale(Number(res.total_price))
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  function redirect(modality: string, id: number) {
    if (modality === 'buy') {
      router.replace('../screens/buy')
    }
    if (modality === 'sale') {
      router.replace('../screens/sale')
    }
  }

  useEffect(() => {
    listTransactions()
    loadBalance()
  }, [])

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />

      <View className='flex flex-row w-full h-48'>
        <View className='flex justify-between items-center bg-white  p-4 gap-2 border-[1px] border-orange-300'>
          <Text className={(totalPriceSale - totalPriceBuy) > 0 ? 'text-xl font-bold text-green-700' : 'text-xl font-bold text-red-700'}>SALDO</Text>
          <Text className={(totalPriceSale - totalPriceBuy) > 0 ? 'text-4xl font-bold text-green-700' : 'text-4xl font-bold text-red-700'}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPriceSale - totalPriceBuy)}
          </Text>

          <View className='flex flex-row justify-center items center w-full gap-2 p-4'>
            <View className='w-1/2 h-full px-4'>
              <Text className=' text-blue-800 text-center font-bold'>VENDAS</Text>
              <Text className=' text-blue-800 text-center font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPriceSale)}
              </Text>
            </View>
            <View className="w-1/2 h-full px-4">
              <Text className='text-red-800 text-center font-bold'>COMPRAS</Text>
              <Text className='text-red-800 text-center font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPriceBuy)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className='w-full py-4 px-4'>
        <Text className='text-orange-950 font-bold text-lg'>ÚLTIMOS LANÇAMENTOS:</Text>
        <FlatList
          className='flex h-[460px]'
          data={dataTransaction}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <ItemList item={item} />
          }
        />
      </View>
    </View>
  );
}

