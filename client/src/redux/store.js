import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../redux/user/user.slice.js'


export const store = configureStore({
    reducer: {user : userReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store