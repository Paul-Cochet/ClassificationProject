import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import DispCategory from './DispCategory'

const Content = ({ navigation }) => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const renderCat = ({ item }) => (
    // <View>
    //   <Pressable onPress={() => navigation.push('layer', { categoryId: 'pathFunction() => an id', title: item })} style={({pressed}) => [
    //     {
    //       backgroundColor: pressed
    //         ? 'grey'
    //         : 'white'
    //     }
    //   ]}>
    //     <Text>{item}</Text>
    //   </Pressable>
    // </View>
    <View>
      <Text>{item}</Text>
      <DispCategory content={categories[item]} />
    </View>
  );

  return (
    <View style={StyleSheet.container}>
      <FlatList
        data={Object.keys(categories)}
        keyExtractor={item => categories[item].key}
        renderItem={renderCat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Content;