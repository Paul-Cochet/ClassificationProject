import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category';

export default configureStore({
  reducer: {
    categories: categoryReducer
  }
})
