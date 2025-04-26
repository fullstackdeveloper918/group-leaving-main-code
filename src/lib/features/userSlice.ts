
"use client"
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalCount: {},
    recentProducts: [],
    recentCustomers: [],
    viewItem: 'abhay',
    userData:{}
  }
  
export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      getTotalCount: (state, action) => {
        state.totalCount = action.payload
      },
      setViewItem: (state, action) => {
        state.viewItem = action.payload
      },
     
     
      getuserData: (state, action) => {
        state.userData = action.payload
      },
      clearUserData: (state, action) => {
        state.userData = action.payload
      },
    
    },
  })


  export const {getTotalCount,setViewItem,getuserData,clearUserData}  = AdminSlice.actions
  export default AdminSlice.reducer