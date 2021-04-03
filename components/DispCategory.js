import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from "react-native";

const DispCategory = ({ navigation, content}) => {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const _listEmptyComponent = (info) => {
    // if (info !== undefined) {
    // console.log(info);
    return (
      <View style={styles.indent}>
        <FlatList
          data={info}
          keyExtractor={(index) => index}
          renderItem={({item}) => (<Text>{item.field}: {item.value}</Text>)}
        />
      </View>
    )  
    // } else {
    //   return (
    //     <View style={styles.indent}>
    //       <Text>empty</Text>
    //     </View>
    //   )        
    // }
  }
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
    <View style={styles.indent}>
      <Text>{item}</Text>
      <DispCategory content={content[item]} />
    </View>
  );
  
  console.log(content)
  return (
    <View>
      <FlatList
        data={Object.keys(content).filter(field => field !== "key" && field !== "info")}
        ListEmptyComponent={_listEmptyComponent(content.info)}
        keyExtractor={item => content[item].key}
        renderItem={renderCat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  indent: {
    margin: 3,
    marginLeft: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 3
  },
});

export default DispCategory