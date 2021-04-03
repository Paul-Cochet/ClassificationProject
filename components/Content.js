import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/category';
import DispCategory from './DispCategory'

const Content = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const _listEmptyComponent = (info) => {
    return (
      <View style={styles.indent}>
        <FlatList
          data={info}
          keyExtractor={(index) => index}
          renderItem={({item}) => (<Text>{item.field}: {item.value}</Text>)}
        />
      </View>
    )
  }

  const renderCat = ({ item }, id) => (
    <View>
      <Pressable onPress={() => navigation.push('layer', { categoryId: id, title: item })} style={({pressed}) => [
        {
          backgroundColor: pressed
            ? 'grey'
            : 'cyan',
            padding: 10,
            margin: 5,
        }
      ]}>
        <Text style={styles.catText}>{item}</Text>
      </Pressable>
    </View>
  );

  console.log(categories);
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(categories).filter(field => field !== "info")}
        keyExtractor={item => categories[item].key}
        ListEmptyComponent={_listEmptyComponent(categories.info)}
        renderItem={(item) => renderCat(item, categories[item.item].key)}
        ListFooterComponent={<View style={styles.footer}/>}
      />
      <View style={styles.addBar}>
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="category"
          />
        <Button
          onPress={() => {
            onChangeText("");
            dispatch(add({field: text, key: ''}));
          }}
          title='try me'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  catText: {
    fontSize: 20,
  },
  footer: {
    height: 20
  },
  addBar: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 10,
  },
  input: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    paddingLeft: 8,
  },
  button: {
    flex: 1,
  },
});


export default Content;