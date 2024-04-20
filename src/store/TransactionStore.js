import get from 'lodash/get'
import { useContext } from 'react'
import { getRequest, postRequest } from '../apiWrapper/networkApiWrapper'
import { actions } from '../constants/Strings'
import { GlobalStateContext } from './GlobalStateContext'

const { SET_LOADING, SET_TRANSACTION, SET_TOTAL_PAGES, SET_MAIN_SCREEN_TRANSACTIONS, SET_CATEGORY_LIST, SET_CHART_DATA} = actions
const MAIN_SCREEN_LIMIT = 3
const ALL_TRANSACTION_LIMIT = 5

const TransactionStore = () => {
  const {state, dispatch } = useContext(GlobalStateContext)
  const {currentPage} = state

  const dispatchData = (type, payload) => {
    dispatch({ type, payload })
  }

  const fetchMainScreenTransactions = async () => {
    dispatchData(SET_LOADING, true)
    try {
      const response = await getRequest(`/api/transactions?page=${1}&limit=${MAIN_SCREEN_LIMIT}`)
      const list = get(response, 'data.data', [])
      dispatchData(SET_MAIN_SCREEN_TRANSACTIONS, list)
    } catch (err) {
      console.log('Error Fetching Main Screen Transactions', err)
    } finally {
      dispatchData(SET_LOADING, false)
    }
  }

  const fetchAllTransactions = async () => {
    dispatchData(SET_LOADING, true)
    try {
      const response = await getRequest(`/api/transactions?page=${currentPage}&limit=${ALL_TRANSACTION_LIMIT}`)
      const list = get(response, 'data.data', [])
      const total = get(response, 'data.total', 0)
      const totalPages = Math.ceil(total/ALL_TRANSACTION_LIMIT)
      dispatchData(SET_TRANSACTION, list)
      dispatchData(SET_TOTAL_PAGES, totalPages)
    } catch (err) {
      console.log('Error Fetching All Transactions', err)
    } finally {
      dispatchData(SET_LOADING, false)
    }
  }

  const addTransaction = async (formData) => {
    dispatchData(SET_LOADING, true)
    try {
      await postRequest('/api/add-transaction', formData)
      const response = await getRequest(`/api/transactions?page=${1}&limit=${MAIN_SCREEN_LIMIT}`)
      const data = get(response, 'data.data', [])
      dispatchData(SET_MAIN_SCREEN_TRANSACTIONS, data)
    } catch (err) {
      console.log('Error Adding Transaction', err)
    } finally {
      dispatchData(SET_LOADING, false)
    }
  }

  const getCategories = async () => {
    try {
      const response = await getRequest('/api/categories')
      const data = get(response, 'data', [])
      dispatchData(SET_CATEGORY_LIST, data)
    } catch (err) {
      console.log('Error Fetching Categories', err)
    }
  }

  const convertDataForPieChart = (data) => {
    const labels = []
    const amounts = []
    const colors = []
  
    data.forEach((item) => {
      labels.push(item.name)
      amounts.push(item.sum)
      colors.push(item.color)
    })
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: amounts,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    }
  
    return chartData
  }
  

  const fetchChartData = async () => {
    try {
      const response = await getRequest('/api/chart-data') 
      const data = get(response, 'data', []) 

      dispatchData(SET_CHART_DATA, data)   
    } catch (err) {
      console.log('Error fetching chart data:', err)
    }
  }

  return { fetchMainScreenTransactions, fetchAllTransactions, addTransaction, getCategories, fetchChartData}
}

export default TransactionStore
