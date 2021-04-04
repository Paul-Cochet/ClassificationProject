import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, addInfo } from '../redux/category';
import { View, Text, FlatList, StyleSheet, Pressable, Button, TextInput, TouchableOpacity } from "react-native";
import { Edit, PlusSquare, Eye } from "react-native-feather";

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

const EmptyList = ({categoryId, info}) => {
  const [editOn, setEdit] = useState(false);
  const [infoField, onChangeInfoField] = useState("");
  const [infoValue, onChangeInfoValue] = useState("");
  const categories = useSelector((state) => state.categories);
  const content = searchCategoryByKey(categories, categoryId);
  const dispatch = useDispatch();

  const infoItem = ({item}) => (
    <View style={styles.editOn}>
      { editOn === false
        ? <Text style={styles.infoText}>{item.field}: {item.value}</Text>
        : <View style={styles.editOn}>
            <TextInput
              style={styles.infoInput1}
              onChangeText={onChangeInfoField}
              value={infoField}
              placeholder="field"
            />
            <TextInput
              style={styles.infoInput2}
              onChangeText={onChangeInfoValue}
              value={infoValue}
              placeholder="value"
            />
            <TouchableOpacity onPress={() => {
              dispatch(addInfo({field: infoField, value: infoValue, key: content.key}));
              setEdit(!editOn);
            }} style={styles.edit}>
              <PlusSquare height={40} width={40}/>
            </TouchableOpacity>
          </View>
      }
    </View>
  );

  if (info !== undefined && info.length > 0) {
    return (
      <View style={styles.info}>
        <FlatList
          data={info}
          keyExtractor={(item) => item.id}
          renderItem={infoItem}
          style={{flex:5}}
        />
        { editOn === false
        ? <TouchableOpacity onPress={() => setEdit(!editOn)} style={styles.edit}>
            <Edit height={40} width={40}/>
          </TouchableOpacity>
        : <TouchableOpacity onPress={() => setEdit(!editOn)} style={styles.edit}>
            <Eye height={40} width={40}/>
          </TouchableOpacity>
        }
      </View>
    )
  } else {
    return (
      <View style={styles.info}>
        { editOn === false ?
          <View style={styles.editOn}>
            <Text style={styles.infoText}>empty</Text>
            <TouchableOpacity onPress={() => setEdit(!editOn)} style={styles.edit}>
              <Edit height={40} width={40}/>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.editOn}>
            <TextInput
              style={styles.infoInput1}
              onChangeText={onChangeInfoField}
              value={infoField}
              placeholder="field"
            />
            <TextInput
              style={styles.infoInput2}
              onChangeText={onChangeInfoValue}
              value={infoValue}
              placeholder="value"
            />
            <TouchableOpacity onPress={() => {
              dispatch(addInfo({field: infoField, value: infoValue, key: content.key}));
              setEdit(!editOn);
            }} style={styles.edit}>
              <PlusSquare height={40} width={40}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEdit(!editOn)} style={styles.edit}>
              <Eye height={40} width={40}/>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
info: {
    margin: 3,
    marginLeft: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 3,
    flexDirection: 'row',
  },
  infoText: {
    flex: 1,
    fontSize: 20,
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
  infoInput1: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    paddingLeft: 8,
    marginRight: 10,
  },
  infoInput2: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    paddingLeft: 8,
    marginRight: 30,
  },
  button: {
    flex: 1,
  },
  edit: {
    marginRight: 5,
  },
  editOn: {
    flexDirection: 'row',
  }
});

export default EmptyList;