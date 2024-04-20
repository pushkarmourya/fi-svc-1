import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import MainScreen from './screens/MainScreen/MainScreen'
import TransactionsList from './screens/TransactionsList.js/TransactionsList'
import { GlobalStateProvider } from './store/GlobalStateContext'

const App = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<MainScreen />} />
          <Route path="/transactions" element={<TransactionsList />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  )
}

export default App
