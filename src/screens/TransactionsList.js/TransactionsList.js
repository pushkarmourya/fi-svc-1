import get from 'lodash/get'
import React, { useContext, useEffect } from 'react'
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator'
import EmptyState from '../../components/EmptyState/EmptyState'
import TableComponent from '../../components/TableComponenrt/TableComponent'
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import { actions, strings } from '../../constants/Strings'
import { GlobalStateContext } from '../../store/GlobalStateContext'
import TransactionStore from '../../store/TransactionStore'
import './styles.css'

const TransactionsList = () => {
  const { state, dispatch } = useContext(GlobalStateContext)
  const { loading, transactions, currentPage, totalPages, chartData } = state
  const { fetchAllTransactions, fetchChartData } = TransactionStore()
  const { SET_CURRENT_PAGE } = actions

  useEffect(() => {
    fetchAllTransactions()
  }, [currentPage])

  useEffect(() => {
    fetchChartData()
  }, [])

  const dispatchData = (type, payload) => {
    dispatch({ type, payload })
  }

  const handlePrevPage = () => {
    dispatchData(SET_CURRENT_PAGE, Math.max(currentPage - 1, 1))
  }

  const handleNextPage = () => {
    dispatchData(SET_CURRENT_PAGE, Math.max(currentPage + 1, totalPages))
  }

  if (loading) {
    return <div className='loader-conatiner'>
      <ActivityIndicator />
    </div>
  }

  if (!get(transactions, 'length', 0)) {
    return <EmptyState />
  }

  return (
    <div className='main-page'>
      <div className='item-container'>
        <h2>{strings.insightHeading}</h2>
        <div>
          <ul>
            {transactions.map((transaction) => (
              <TransactionItem transaction={transaction} />
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              {strings.prev}
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              {strings.next}
            </button>
          </div>
        </div>
        <div>
          {/* <PiechartComponent chartData={chartData} /> */}
          <TableComponent chartData={chartData} />
        </div>
      </div>
    </div>
  )
}

export default TransactionsList
