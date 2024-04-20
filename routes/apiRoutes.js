const express = require('express')
const router = express.Router()
const connection = require('../db') 

router.post('/add-transaction', (req, res) => {
  const { date, amount, category_id, description } = req.body

  connection.query(
    'INSERT INTO transactions (date, amount, category_id, description) VALUES (?, ?, ?, ?)',
    [date, amount, category_id, description],
    (err, result) => {
      if (err) {
        console.error('Error adding transaction:', err)
        res.status(500).json({ message: 'Error adding transaction' })
      } else {
        res.status(201).json({ message: 'Transaction added successfully', transactionId: result.insertId })
      }
    }
  )
})

router.get('/transactions', (req, res) => {
  const { page = 1, limit = 10 } = req.query
  let offset = (page - 1) * limit

  let query = `
    SELECT t.*, c.name as category_name, c.color as category_color
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    LIMIT ${limit} OFFSET ${offset}
  `
  let countQuery = `
    SELECT COUNT(*) as total
    FROM transactions
  `

  connection.query(query, (err, results) => {
    if (err) {
      console.log('Error fetching transactions:', err)
      res.status(500).json({ message: 'Error fetching transactions' })
    } else {
      connection.query(countQuery, (err, countResult) => {
        if (err) {
          console.log('Error fetching transaction count:', err)
          res.status(500).json({ message: 'Error fetching transaction count' })
        } else {
          const total = countResult[0].total
          res.json({ total, data: results })
        }
      })
    }
  })
})

router.get('/chart-data', (req, res) => {
  const query = `
    SELECT 
      c.id as category_id,
      c.name as name,
      c.color as color,
      SUM(t.amount) as sum
    FROM 
      categories c
    LEFT JOIN 
      transactions t ON c.id = t.category_id
    GROUP BY 
      c.id
  `

  connection.query(query, (err, results) => {
    if (err) {
      console.log('Error fetching chart data:', err)
      res.status(500).json({ message: 'Error fetching chart data' })
    } else {
      res.json(results)
    }
  })
})

router.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categories'

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err)
      res.status(500).json({ message: 'Error fetching categories' })
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
