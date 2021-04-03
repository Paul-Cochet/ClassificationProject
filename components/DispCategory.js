import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../redux/category';
import { View, Text, FlatList, StyleSheet, Pressable, Button, TextInput } from "react-native";

const searchCategoryByKey = (object, key) => {
  for (var field in object) {
    if (field !== "key" && field !== "info" && object[field].key === key) {
      return object[field];
    } else if (field !== 'key' && field !== "info") {
      const obj = searchCategoryByKey(object[field], key);
      if (Object.keys(obj).length !== 0) {
        return obj;
      }
    }
  }
  return {}
};

const DispCategory = ({ route, navigation }) => {
  const [text, onChangeText] = useState("");
  const { categoryId } = route.params;
  const categories = useSelector((state) => state.categories);
  const content = searchCategoryByKey(categories, categoryId);
  const dispatch = useDispatch();

  const _listEmptyComponent = (info) => {
    if (info !== undefined && info.length > 0) {
      return (
        <View style={styles.indent}>
          <FlatList
            data={info}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (<Text>{item.field}: {item.value}</Text>)}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.indent}>
          <Text>empty</Text>
        </View>
      )
    }
  };

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

  return (
    <View>
      <FlatList
        data={Object.keys(content).filter(field => field !== "key" && field !== "info")}
        ListEmptyComponent={_listEmptyComponent(content.info)}
        keyExtractor={item => content[item].key}
        renderItem={(item) => renderCat(item, content[item.item].key)}
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
            dispatch(add({field: text, key: content.key}));
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
  indent: {
    margin: 3,
    marginLeft: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 3
  },
  footer: {
    height: 70
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

export default DispCategory