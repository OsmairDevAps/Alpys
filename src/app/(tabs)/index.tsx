import { useCallback, useState } from 'react';
import { Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import useFinance from '@/src/app/contexts/transactionContext';
import { useForm } from 'react-hook-form';
import Header from '@/src/components/Header';
import ItemList from '@/src/components/ItemList';
import ViewBuy from '../screens/view/buy';
import ViewSale from '../screens/view/sale';
import { useFocusEffect } from '@react-navigation/native';
import LoadingLogo from '@/src/components/Loading';
import { Feather } from '@expo/vector-icons';
import Input from '@/src/components/Form/Input';
import Button from '@/src/components/Button';
import { convertDateFormat, formatarData } from '@/src/util/functions';

type FilterProps = {
  dateIni: string;
  dateFim: string;
}

export default function Listagem() {
  const hoje = new Date();
  const dataInicial = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const dataFinal = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
  const dtI = formatarData(dataInicial)
  const dtF = formatarData(dataFinal)
  const { dataResume, loadData, dataTransaction, isLoading } = useFinance();
  const { handleSubmit, control } = useForm<FilterProps>({
    defaultValues: {
      dateIni: dtI,
      dateFim: dtF
    }
  })
  const [dtIni, setDtIni] = useState(dtI)
  const [dtFim, setDtFim] = useState(dtF)
  const [idBuy, setIdBuy] = useState(0)
  const [idSale, setIdSale] = useState(0)
  const [isModalBuyOpen, setIsModalBuyOpen] = useState(false)
  const [isModalSaleOpen, setIsModalSaleOpen] = useState(false)
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false)

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

  function handleFilter(data: FilterProps) {
    setDtIni(data.dateIni)
    setDtFim(data.dateFim)
    setIsModalFilterOpen(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadData(convertDateFormat(dtIni), convertDateFormat(dtFim));
    }, [dtIni, dtFim])
  );

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <LoadingLogo />
        <Text className='mt-2 text-orange-500'>Carregando...</Text>
      </View>
    )
  }

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />

      <View className='flex flex-row w-full h-48'>
        <View className='flex justify-between items-center bg-white  p-4 gap-2 border-[1px] border-orange-300'>
          <Text className={dataResume.resume > 0 ? 'text-xl font-bold text-green-700' : 'text-xl font-bold text-red-700'}>SALDO</Text>
          <Text className={dataResume.resume > 0 ? 'text-4xl font-bold text-green-700' : 'text-4xl font-bold text-red-700'}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(dataResume.sale) - Number(dataResume.buy))}
          </Text>

          <View className='flex flex-row justify-center items center w-full gap-2 p-4'>
            <View className='w-1/2 h-full px-4'>
              <Text className=' text-blue-800 text-center font-bold'>VENDAS</Text>
              <Text className=' text-blue-800 text-center font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(dataResume.sale))}
              </Text>
            </View>
            <View className="w-1/2 h-full px-4">
              <Text className='text-red-800 text-center font-bold'>COMPRAS</Text>
              <Text className='text-red-800 text-center font-bold'>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(dataResume.buy))}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className='w-full py-4 px-4'>
        <View className='flex flex-row justify-between items-center'>
          <Text className='text-orange-950 font-bold text-lg'>ÚLTIMOS LANÇAMENTOS:</Text>
          <TouchableOpacity onPress={() => setIsModalFilterOpen(true)} className='flex flex-row gap-2 justify-center items-center'>
            <Feather name='sliders' size={20} />
            <Text className='font-semibold'>Filtrar</Text>
          </TouchableOpacity>
        </View>
        <Text className='font-semibold text-md'>Período: {dtIni} a {dtFim}</Text>
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

      <Modal
        transparent={true}
        animationType='fade'
        visible={isModalFilterOpen}
        onRequestClose={() => {
          setIsModalFilterOpen(!isModalFilterOpen)
        }}>
        <View className='flex flex-1 bg-orange-50 px-4 mt-28'>
          <View>
            <Text>Data Inicial:</Text>
            <Input
              control={control}
              formProps={{
                name: 'dateIni',
              }}
              inputProps={{
                placeholder: "dd/mm/aaaa",
                keyboardType: 'phone-pad'
              }}
            />
          </View>
          <View>
            <Text>Data Final:</Text>
            <Input
              control={control}
              formProps={{
                name: 'dateFim',
              }}
              inputProps={{
                placeholder: "dd/mm/aaaa",
                keyboardType: 'phone-pad'
              }}
            />
          </View>
          <Button title='Filtrar' onPress={handleSubmit(handleFilter)} />
        </View>
      </Modal>
    </View>
  );
}

