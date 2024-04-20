import React, { createContext, useReducer } from 'react'
import { actions } from '../constants/Strings'

const {ADD_TRANSACTION, SET_TRANSACTION, SET_LOADING, SET_ERROR, SET_CURRENT_PAGE, SET_TOTAL_PAGES, SET_MAIN_SCREEN_TRANSACTIONS, SET_CATEGORY_LIST, SET_CHART_DATA} = actions
const initialState = {
  transactions: [],
  mainScreenTransactions:[],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  categoryList: [],
  chartData: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }
    case SET_TRANSACTION:
        return {
            ...state,
            transactions: action.payload
        }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      }
    case SET_MAIN_SCREEN_TRANSACTIONS:
      return {
        ...state,
        mainScreenTransactions: action.payload,
      }
    case SET_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
      }
    case SET_CHART_DATA:
      return {
        ...state,
        chartData: action.payload,
      }
    default:
      return state
  }
}

export const GlobalStateContext = createContext()

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  )
}
