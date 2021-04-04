import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Button, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/category';
import { Trash2 } from "react-native-feather";
import EmptyList from './EmptyList'

const Content = ({ navigation }) => {
  const [text, onChangeText] = useState("");
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const renderCat = ({ item }, id) => (
    <View>
      <Pressable onPress={() => navigation.push('layer', { categoryId: id, title: item })} style={({pressed}) => [
        {
          backgroundColor: pressed
            ? 'grey'
            : 'cyan',
            padding: 10,
            margin: 5,
            flexDirection: 'row',
        }
      ]}>
        <Text style={styles.catText}>{item}</Text>
        <TouchableOpacity onPress={() => dispatch(remove(id))} style={styles.delete}>
          <Trash2 height={30} width={30} />
        </TouchableOpacity>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(categories).filter(field => field !== "info")}
        keyExtractor={item => categories[item].key}
        ListEmptyComponent={<EmptyList categoryId={''} info={categories.info}/>}
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
          title='Add'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  catText: {
    flex: 13,
    fontSize: 20,
    marginTop: 2,
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
  delete: {
    flex: 1,
    paddingRight: 10,
  },
});


export default Content;