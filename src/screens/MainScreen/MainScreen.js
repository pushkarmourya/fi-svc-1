import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddTransaction from '../../components/AddTransaction/AddTransaction'
import TransactionItem from '../../components/TransactionItem/TransactionItem'
import { GlobalStateContext } from '../../store/GlobalStateContext'
import TransactionStore from '../../store/TransactionStore'
import './styles.css'
import { strings } from '../../constants/Strings'

const MainScreen = () => {
    const { fetchMainScreenTransactions } = TransactionStore()
    const { state } = useContext(GlobalStateContext)
    const { mainScreenTransactions } = state

    useEffect(() => {
        fetchMainScreenTransactions()
    }, [])
    
    const renderAllTransactionText = () => {
        return (
            <Link to="/transactions">
              {strings.viewAllTransaction}
            </Link>
          ) 
    }
    
    return <div className="main-page">
        <AddTransaction/>
        <div className='item-container'>

        <h1>{strings.recentTransaction}</h1>
        {mainScreenTransactions.map((transaction) => (
          <TransactionItem transaction={transaction} />
          ))}
        {renderAllTransactionText()}
          </div>
    </div>
}

export default MainScreen