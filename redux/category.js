import { createSlice } from '@reduxjs/toolkit'

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

const searchDeleteCategory = (object, key) => {
  for (var field in object) {
    if (field !== "key" && object[field].key === key) {
      var dup = Object.assign({}, object);
      delete dup[field];
      return dup;
    } else if (field !== 'key') {
      obj = searchDeleteCategory(object[field], key);
      if (obj !== {}) {
        return {
          ...object,
          [field]: obj
        }
      }
    }
  }
  return {}
}

export const counterSlice = createSlice({
  name: 'categoryDir',
  initialState: {
    fruits: {
      key: '1',
      oranges: {
        key: '2',
        info: [
          {
            key: '4',
            field: 'name',
            value: 'lol'
          },
          {
            key: '5',
            field: 'price',
            value: 5
          }
        ]
      },
      lemons: {
        key: '3',
        info: [
          {
            key: '6',
            field: 'name',
            value: 'not lol'
          }
        ]
      }
    }
  },
  reducers: {
    add: (state, action) => {
      if (action.payload.key === '') {
        if (!(action.payload.field in state)) {
          state[action.payload.field] = {key: Math.random().toString()}
        }
      } else {
        const obj = searchCategoryByKey(state, action.payload.key);
        if (!(action.payload.field in obj)) {
          obj[action.payload.field] = {key: Math.random().toString()}
        }
      }
    },
    remove: (state, action) => {
      searchDeleteCategory(state, action.payload);
    }
  }
})

export const { add, remove } = counterSlice.actions

export default counterSlice.reducer