import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

interface ItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  removeItem: (item_id: string) => void;
}

export function ListItem({ data, removeItem }: ItemProps) {

  function handleRemoveItem() {
    removeItem(data.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.item}>{data.name}: {data.amount}</Text>
      
      <TouchableOpacity onPress={handleRemoveItem}>
        <Feather name="trash-2" color="#FF3F4b" size={25} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#101026',
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#8a8a8a'
  },
  item: {
    color: '#FFF'
  }
});