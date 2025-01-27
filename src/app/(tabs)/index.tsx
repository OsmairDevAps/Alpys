import { Text, View, FlatList, Modal } from 'react-native';
import useFinance from '@/src/app/contexts/transactionContext';
import Header from '@/src/components/Header';
import ItemList from '@/src/components/ItemList';
import { useState } from 'react';
import ViewBuy from '../screens/view/buy';
import ViewSale from '../screens/view/sale';

export default function Listagem() {
  const { data, dataTransaction, isLoading } = useFinance();
  const [idBuy, setIdBuy] = useState(0)
  const [idSale, setIdSale] = useState(0)
  const [isModalBuyOpen, setIsModalBuyOpen] = useState(false)
  const [isModalSaleOpen, setIsModalSaleOpen] = useState(false)

  function redirect(modality: string, id: number) {
    if (modality === 'buy') {
      setIsModalBuyOpen(true)
      setIdBuy(id)
    }
    if (modality === 'sale') {
      setIsModalSaleOpen(true)
      setIdSale(id)
    }
  }

  if(isLoading) {
    return <Text className='p-2 w-full text-center'>Carregando...</Text>
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />
      
      <View className='flex flex-row w-full h-48'>
        <View className='flex justify-between items-center bg-white  p-4 gap-2 border-[1px] border-orange-300'>
          <Text className={(data.balance) > 0 ? 'text-xl font-bold text-green-700' : 'text-xl font-bold text-red-700'}>SALDO</Text>
          <Text className={(data.balance) > 0 ? 'text-4xl font-bold text-green-700' : 'text-4xl font-bold text-red-700'}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.balance)}
          </Text>

          <View className='flex flex-row justify-center items center w-full gap-2 p-4'>
            <View className='w-1/2 h-full px-4'>
              <Text className=' text-blue-800 text-center font-bold'>VENDAS</Text>
              <Text className=' text-blue-800 text-center font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.sales)}
              </Text>
            </View>
            <View className="w-1/2 h-full px-4">
              <Text className='text-red-800 text-center font-bold'>COMPRAS</Text>
              <Text className='text-red-800 text-center font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.buys)}
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
            <ItemList item={item} onPress={() => redirect(item.modality, item.id)} />
          }
        />
      </View>
      
      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalBuyOpen}
        onRequestClose={() => {
          setIsModalBuyOpen(!isModalBuyOpen)
      }}>
        <ViewBuy 
          closeModal={setIsModalBuyOpen} 
          id={idBuy}
        />
      </Modal>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalSaleOpen}
        onRequestClose={() => {
          setIsModalSaleOpen(!isModalSaleOpen)
      }}>
        <ViewSale 
          closeModal={setIsModalSaleOpen} 
          id={idSale}
        />
      </Modal>
    </View>
  );
}

