import { Text, View, FlatList, Dimensions, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
import Header from '@/src/components/Header';
import ItemList from '@/src/components/ItemList';

export default function Listagem() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const restHeight = (windowHeight - 348).toFixed()
  const { height, width } = useWindowDimensions();
  
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

      <View className='w-full h-52 my-4'>
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
        <Text className='text-white my-2'>Listagem:</Text>
        <FlatList 
          className='flex h-[440px]'
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

