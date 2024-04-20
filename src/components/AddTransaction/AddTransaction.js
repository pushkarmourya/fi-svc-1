import React, { useContext, useEffect, useState } from 'react'
import TransactionStore from '../../store/TransactionStore'
import './styles.css'
import { GlobalStateContext } from '../../store/GlobalStateContext'
import { labels } from '../../constants/Strings'

const AddTransaction = () => {
  const { addTransaction, getCategories } = TransactionStore()
  const { state } = useContext(GlobalStateContext)
  const { categoryList } = state
  useEffect(() => {
    getCategories()
  },[])
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category_id: '',
    description: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTransaction(formData)
    setFormData({ date: '', amount: '', category_id: '', description: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <label>{labels.dateLabel}</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <label>{labels.amountLabel}</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

      <label>{labels.categoryLabel}</label>
      <select
        name="category"
        value={formData.category_id}
        onChange={(e) => {
          setFormData({ ...formData, category_id: e.target.value }) }
        }
        required
      >
        <option value="">{labels.selectCategory}</option>
        {categoryList.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option> 
        ))}
      </select>

      <label>{labels.descriptionLabel}</label>
      <input type="text" name="description" value={formData.description} onChange={handleChange} required />

      <button type="submit">{labels.submitButtonLabel}</button>
    </form>
  )
}

export default AddTransaction
