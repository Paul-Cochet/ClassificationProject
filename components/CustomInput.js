import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editInfo } from '../redux/category';
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Save } from "react-native-feather";

const CustomInput = ({item, parent}) => {
  const [myField, setField] = useState(item.field);
  const [myValue, setValue] = useState(item.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.infoInput1}
        onChangeText={setField}
        value={myField}
        placeholder="field"
      />
      <TextInput
        style={styles.infoInput2}
        onChangeText={setValue}
        value={myValue}
        placeholder="value"
      />
      <TouchableOpacity onPress={() => {
        dispatch(editInfo({field: myField, value: myValue, key: item.key, parent: parent}));
      }} style={styles.icon}>
        <Save height={40} width={40}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoInput1: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    paddingLeft: 8,
    margin: 5,
    marginTop: 0,
    marginRight: 10,
  },
  infoInput2: {
    flex: 3,
    height: 40,
    borderWidth: 1,
    paddingLeft: 8,
    margin: 5,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    marginRight: 5,
  },
});

export default CustomInput;