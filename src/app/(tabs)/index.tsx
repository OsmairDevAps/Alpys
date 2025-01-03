//https://nativecn.vercel.app/docs/installation
import { Text, View, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
import Header from '@/src/components/Header';
import ItemList from '@/src/components/ItemList';
import { GraphicProps, IDataTransaction } from '@/src/constants/interface'
import { useTransactionDatabase } from '@/src/database/useTransactionDatabase';
import { useEffect, useState } from 'react';

export default function Listagem() {
  const transactionDatabase = useTransactionDatabase()
  const [dataTransaction, setDataTransaction] = useState<IDataTransaction[]>([])
  const [graphic, setGraphic] = useState<GraphicProps[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [dataGraphic, setDataGraphic] = useState<number[]>([])
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const restHeight = (windowHeight - 348).toFixed()
  const { height, width } = useWindowDimensions();
  
  async function listTransactions() {
    try {
      const response = await transactionDatabase.list()
      setDataTransaction(response)
    } catch (error) {
      console.log(error)
    }
  }

  // labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"],
  // { data: [120, 130, 140, 150, 160, 170] }
  async function listTransactionsGraphic() {
    try {
      const response = await transactionDatabase.listGraphic()
      if(response) {
        let newArray = response.map(lab => {
          return [ lab.datetransaction, lab.price ]
        })
        console.log(newArray)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const dataChart = {
    labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ],
        color: (opacity = 1) => `rgba(242, 121, 0, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["VENDAS"]
  }
  
  useEffect(() => {
    listTransactions()
    listTransactionsGraphic()
  },[])

  return (
    <View className='flex flex-1 items-center justify-start bg-orange-950'>
      <Header />

      <View className='w-full h-48 my-4'>
        <LineChart
          data={dataChart}
          width={width}
          height={180}
          verticalLabelRotation={0}
          chartConfig={{
            backgroundGradientFrom: "#fcfcfc",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#fb8c00",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            decimalPlaces: 2, 
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          yAxisLabel="R$"
        />
      </View>

      <View className='w-full mt-4 pt-4 pb-2 pl-4 pr-4'>
        <Text className='text-white my-2'>Últimos lançamentos:</Text>
        <FlatList 
          className='flex h-[440px]'
          data={dataTransaction}
          keyExtractor={item => String(item.id)}
          renderItem={ ({item}) => 
            <ItemList item={item} />
          }
        />
      </View>
    </View>
  );
}

