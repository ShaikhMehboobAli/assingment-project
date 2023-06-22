import React from 'react'
import { Routes, Route } from 'react-router-dom'
import VerifyPage from './pages/VerifyPage'
import './Style/App.css';
import RegisterForm from './pages/RegisterForm';
import Protected from './component/Protected';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<VerifyPage />} />
      <Route element={<Protected />}>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/success' element={<SuccessPage />} />
      </Route>
    </Routes>
  )
}

export default App
