import { createSlice } from '@reduxjs/toolkit'
// import { v4 as uuidv4 } from 'uuid';

const searchDeleteCategory = (object, key) => {
  for (var field in object) {
    if (field !== "key" && object[field].key === key) {
      var dup = Object.assign({}, object);
      delete dup[field];
      return dup;
    } else {
      return {
        ...object,
        [field]: searchDeleteCategory(object[field], key)
      }
    }
  }
  throw 'invalid key';
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
            field: 'name',
            value: 'lol'
          },
          {
            field: 'price',
            value: 5
          }
        ]
      },
      lemons: {
        key: '3',
        info: [
          {
            field: 'name',
            value: 'not lol'
          }
        ]
      }
    }
  },
  reducers: {
    add: (state, action) => {
      state[action.payload] = {key: '6'}
    },
    remove: (state, action) => {
      searchDeleteCategory(state, action.payload);
    }
  }
})

export const { add, remove } = counterSlice.actions

export default counterSlice.reducer