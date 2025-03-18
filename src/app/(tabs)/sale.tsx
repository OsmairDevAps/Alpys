import { useState, useEffect } from "react";
import { View, Modal, FlatList, Alert, ActivityIndicator, ListRenderItem } from "react-native";
import Header from "@/src/components/Header";
import FrmSale from "../screens/Form/sale";
import { CardSale } from "@/src/components/Card/sale";
import { ITSale } from "@/src/constants/interface";
import { useSaleSupabase } from "@/src/database/useSaleSupabase";
import HeaderScreen from "@/src/components/HeaderScreen";
import ResumeSale from "../screens/view/resumeSale";

export default function Sales() {
  const saleDatabase = useSaleSupabase()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nullSale, setNullSale] = useState<ITSale>()
  const [sale, setSale] = useState<ITSale>()
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false)
  const [dataSale, setDataSale] = useState<ITSale[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadData = async (page: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
  
    const newData = await saleDatabase.listPagination(from, to)
    if(newData) {
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setDataSale((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      }
    }
    setLoading(false);
  };

  async function handleDelete(id: number) {
    try {
      await saleDatabase.remove(id)
      Alert.alert('Venda excluída com sucesso!')
      loadData(page);
    } catch (error) {
      console.log(error)
    }
  }

  async function handleUpdate(sale: ITSale) {
    setSale(sale)
    setIsModalOpen(true)
  }

  function openModal() {
    setSale(nullSale)
    setIsModalOpen(true)
  }

  function openModalFilter() {
    setIsModalFilterOpen(true)
  }

  const renderItem: ListRenderItem<ITSale> = ({ item }) => (
    <CardSale 
      item={item}
      onUpdate={() => handleUpdate(item)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="p-2 items-center">
        <ActivityIndicator size="small" color="#F97216" />
      </View>
    );
  };

  useEffect(() => {
    loadData(page);
  },[])

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-50'>
      <Header />
      <HeaderScreen 
        titleScreen="VENDAS" 
        titleButton="Nova" 
        onPress={openModal} 
        hasFilter={true} 
        onPressFilter={openModalFilter} 
      />

      <FlatList 
        style={{width: '100%', paddingLeft: 16, paddingRight: 16}}
        data={dataSale}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ gap: 16 }}
        renderItem={renderItem}
        onEndReached={() => loadData(page)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
 
      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalOpen}
        onRequestClose={() => {
           setIsModalOpen(!isModalOpen)
      }}>
        <FrmSale
          closeModal={setIsModalOpen} 
          listSales={loadData(page)} 
          sale={sale} 
        />
      </Modal>
 
      <Modal
        transparent={true}
        animationType='slide'
        visible={isModalFilterOpen}
        onRequestClose={() => {
          setIsModalFilterOpen(!isModalFilterOpen)
      }}>
        <ResumeSale
          closeModal={setIsModalFilterOpen} 
        />
      </Modal>

    </View>
  )
}