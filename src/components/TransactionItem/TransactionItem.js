import React from 'react'
import './styles.css' 
import { labels } from '../../constants/Strings'

const TransactionItem = ({ transaction }) => {
  const date = transaction.date.split('T')[0]
  const itemStyle = {
    backgroundColor: transaction.category_color,
  }

  return (
    <li className="transaction-item" style={itemStyle}>
      <div className="transaction-details">
        <strong>{labels.dateLabel}</strong> {date}
      </div>
      <div className="transaction-details">
        <strong>{labels.amountLabel}</strong> Rs. {transaction.amount}
      </div>
      <div className="transaction-details">
        <strong>{labels.categoryLabel}</strong> {transaction.category_name}
      </div>
      <div className="transaction-details">
        <strong>{labels.descriptionLabel}</strong> {transaction.description}
      </div>
    </li>
  )
}

export default TransactionItem
