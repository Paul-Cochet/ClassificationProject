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
    if (field !== "key" && field !== "info" && object[field].key === key) {
      const dup = Object.assign({}, object);
      delete dup[field];
      return dup;
    } else if (field !== 'key' && field !== "info") {
      obj = searchDeleteCategory(object[field], key);
      if (Object.keys(obj).length !== 0) {
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
    addInfo: (state, action) => {
      if (action.payload.field === '' || action.payload.value === '') {
        return;
      }
      if (action.payload.key === '' || action.payload.key === undefined) {
        console.log('verif')
        if (!('info' in state)) {
          state['info'] = [{ key: Math.random().toString(), field: action.payload.field, value: action.payload.value }]
        } else {
          state.info.push({ key: Math.random().toString(), field: action.payload.field, value: action.payload.value })
        }
        console.log(state.info);
      } else {
        const obj = searchCategoryByKey(state, action.payload.key);
        if (!('info' in obj)) {
          obj['info'] = [{ key: Math.random().toString(), field: action.payload.field, value: action.payload.value }]
        } else {
          obj.info.push({ key: Math.random().toString(), field: action.payload.field, value: action.payload.value })
        }
      }
    },
    remove: (state, action) => {
      state = searchDeleteCategory(state, action.payload);
      return state;
    }
  }
})

export const { add, remove, addInfo } = counterSlice.actions

export default counterSlice.reducer