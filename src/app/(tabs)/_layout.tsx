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
        tabBarActiveTintColor: '#ffa600',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Listagem',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: 'Movimentação',
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
