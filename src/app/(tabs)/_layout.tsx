import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#F97316',
        tabBarActiveBackgroundColor: '#FFF7ED',
        tabBarInactiveTintColor: '#FFF7ED',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F97316',
          borderColor: '#F97316'
        },
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#F97316'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Listagem',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="buy"
        options={{
          title: 'Compras',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sale"
        options={{
          title: 'Vendas',
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Encomendas',
          tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
        }}
      />
    </Tabs>
  );
}
